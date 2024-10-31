import { NextResponse } from "next/server";
import { CreateCookie, CreateSession } from '@/app/lib/session'
import { CheckIfUserExist } from "@/app/lib/auth";
import { ComparePassword, GenerateUUID } from "@/app/lib/utils";
import { AddUserToMap } from "@/app/services/userCache";

// To handle a POST request to /api
export async function POST(request) {
  const formData = await request.formData();
  let email = formData.get('email');
  const password = formData.get('password');

  const hasEmail = email.length > 0;
  if(!hasEmail)
    return NextResponse.json({ email: "There are no users with this email." }, { status: 400 });
  
  const hasPassword = password.length > 0;
  if(!hasPassword)
    return NextResponse.json({ password: "Wrong password. Try again or click ‘Forgot password’ to reset it." }, { status: 400 });
  
  email = email.toLowerCase();

  let user;
  try {
    user = await CheckIfUserExist(email);
    if(!user) 
      return NextResponse.json({ email: "There are no users with this email." }, { status: 400 });
    
    if(!user.password)
      return NextResponse.json({ password: "You do not have an account local to this platform. Try Login with Google." }, { status: 400 });
      
  } catch (error) {
    return NextResponse.json({ error:"There was an issue processing your request. Please try again later!" }, { status: 400 });
  }

  
  const isPasswordSame = await ComparePassword(password, user.password);
  if(!isPasswordSame)
    return NextResponse.json({ password: "Incorrect Password" }, { status: 400 });
  
  const sessionId = await GenerateUUID();
  AddUserToMap(user);
  const session = await CreateSession(sessionId, user.id);
  await CreateCookie(session);
  return NextResponse.json({}, {status: 200});
}
