import { NextResponse } from "next/server";
import prisma from "@/server/prisma";
import { CreateSession, CreateCookie } from '@/app/lib/session'
import { AuthenticateUser, CheckIfBaseEmailExist, CheckIfUserExist, IsAliasEmail } from "@/app/lib/auth";
import { AddUserToMap } from "@/app/services/userCache";
import { GeneratePasswordHash, GenerateUUID } from "@/app/lib/utils";

// To handle a POST request to /api
export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email').toLowerCase();
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordconfirmation');
  
  // Check if all fields were submitted
  if(!email || !password || !username || !passwordConfirmation)
    return NextResponse.json({ error:"Please input all fields." }, { status: 400 });
  
  if(password !== passwordConfirmation)
    return NextResponse.json({ password:"Those passwords did not match. Try again." }, { status: 400 });

  if(password.length < 3)
    return NextResponse.json({ password:"Password must be at least 3 characters long" }, { status: 400 });
  
  const baseEmailData = await IsAliasEmail(email);

  let user;
  try {
    if(!baseEmailData.isAuthorizedProvider)
      return NextResponse.json({ email:"The email provider you used is not allowed. Please sign up using a common email provider like Gmail, Yahoo, Outlook, iCloud, or Zoho" }, { status: 400 });
    
    user = await CheckIfBaseEmailExist(baseEmailData.baseEmail);
    if(user)
      return NextResponse.json({ email:"A user with this email already exist." }, { status: 400 });

    user = await CheckIfUserExist(email, username);
    if(user)
    {
      if(user.username == username) 
        return NextResponse.json({ username:"A user with this username already exist." }, { status: 400 });
      else
        return NextResponse.json({ email:"A user with this email already exist." }, { status: 400 });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error :"Failed to create user. Please try again later." }, { status: 500 });
  }

  const hashedPassword = await GeneratePasswordHash(password);
  const sessionId = await GenerateUUID();
  user = await CreateUser(username, baseEmailData.baseEmail, email, hashedPassword, sessionId);
  
  if(!user)
    return NextResponse.json({ error :"Failed to create user. Please try again later." }, { status: 500 });

  // Creates session and userCache
  await AuthenticateUser(user);

  return NextResponse.json({ success: true}, {status: 200});
}

export async function CreateUser(username, baseEmail, email, password, avatar)
{
  try {
    const user = await prisma.user.create({
      data: {
        username,
              baseEmail,
              email,
              password,
              avatar,
        }
    })
        
    return user;
  } catch (error) {
      console.log(error);
      return null;
  }
}
