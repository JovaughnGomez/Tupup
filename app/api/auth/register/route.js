import { NextResponse } from "next/server";
import prisma from "@/server/prisma";
import { AuthenticateUser, CheckIfBaseEmailExist, CheckIfUserExist, IsAliasEmail } from "@/app/lib/auth";
import { ComparePassword, GeneratePasswordHash, GenerateUUID, IsUsernameValid } from "@/app/lib/utils";
import { DeleteTokenRedis, redisDelete, RetrieveTokenRedis } from "@/app/lib/db";

// To handle a POST request to /api
export async function POST(request) {
  const formData = await request.formData();
  const secret = formData.get('secret');
  const email = formData.get('email');
  let username = formData.get('username');
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordconfirmation');

  // Verify that user is sending a secret and email.
  if(!email || !secret )
    return NextResponse.json({ success: false, redirect: `/register?secret=${secret}&expired=true` }, { status: 400 })
  
  // Find token in database corresponding to email
  const tokenResults = await RetrieveTokenRedis("email_verification", email);
  if(!tokenResults.success)
    return NextResponse.json({ success: false, redirect: `/register?secret=${secret}&expired=true` }, { status: 400 })
  
  // Verify that the token in database and token in email are the same
  const doSecretsMatch = await ComparePassword(secret, tokenResults.token);
  if(!doSecretsMatch)
    return NextResponse.json({ success: false, redirect: `/register?secret=${secret}&expired=true` }, { status: 400 })

  // Check if all fields were submitted
  if(!password || !username || !passwordConfirmation)
    return NextResponse.json({ error:"Please input all fields." }, { status: 400 })

  // Check to make sure username does not have disallowed symbols
  const isUsernameValid = await IsUsernameValid(username);
  if(!isUsernameValid)
    return NextResponse.json({ username:"Username can only contain letters, numbers, and underscores." }, { status: 400 });

  if(password !== passwordConfirmation)
    return NextResponse.json({ error:"Those passwords did not match. Try again." }, { status: 400 });

  if(password.length < 3)
    return NextResponse.json({ error:"Password must be at least 3 characters long." }, { status: 400 });
  
  username = username.toLowerCase();
  username = username.replace(/\s/g,'');
  
  let user;
  const baseEmailData = await IsAliasEmail(email);
  try {
    // Check if an email has already been created with that email or alias.
    const isEmailTaken = await CheckIfBaseEmailExist(baseEmailData.baseEmail);
    if(isEmailTaken)
      return NextResponse.json({ success: false, error: "A account with this email already exist." }, { status: 400 });
    
    // Check if an email has been created with that email or username(email check is redundant here)
    user = await CheckIfUserExist(email, username);
    if(user)
      {
        if(user.username == username) 
          return NextResponse.json({ username:"A account with this username already exist." }, { status: 400 });
        else
        return NextResponse.json({ email:"A account with this email already exist." }, { status: 400 });
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
  await DeleteTokenRedis("email_verification", email);
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
