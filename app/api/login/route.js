import { NextResponse } from "next/server";
import { CreateCookie, CreateSession, DeleteSessionWithId } from '@/app/lib/utils'
import { CheckIfUserExist, ComparePassword } from "@/app/lib/auth";
import { UpdateUserSessionId } from "@/app/lib/userController";
import { v4 as uuidv4 } from 'uuid';

// To handle a POST request to /api
export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email').toLowerCase();
  const password = formData.get('password');

  const hasEmail = email.length > 0;
  if(!hasEmail)
    return NextResponse.json({ email: "There are no users with this email." }, { status: 400 });
  
  const hasPassword = password.length > 0;
  if(!hasPassword)
    return NextResponse.json({ password: "Wrong password. Try again or click ‘Forgot password’ to reset it." }, { status: 400 });
  
  let user;
  try {
    user = await CheckIfUserExist(email);
    if(!user) 
      return NextResponse.json({ email: "There are no users with this email." }, { status: 400 });
      
  } catch (error) {
    return NextResponse.json({ error:"There was an issue processing your request. Please try again later!" }, { status: 400 });
  }

  if(!user.isActive)
    return NextResponse.json({ error:"You aren't authorized to log in." }, { status: 400 });
  
  const isPasswordSame = await ComparePassword(password, user.password);
  if(!isPasswordSame)
    return NextResponse.json({ password: "Incorrect Password" }, { status: 400 });

  if(user.sessionId)
    await DeleteSessionWithId(user.sessionId);
  
  const sessionId = uuidv4();
  const loginSuccessful = await UpdateUserSessionId(user.id, sessionId);
  if(loginSuccessful)
  {
    const session = await CreateSession(user, sessionId);
    await CreateCookie(session);
    return NextResponse.json({}, {status: 200});
  } else {
    return NextResponse.json({ error:"Unexpected Error. Please try again!" }, { status: 500 });
  }
}
