import { NextResponse } from "next/server";
import prisma from "@/server/prisma";
import bcrypt from 'bcrypt';
import { CreateSession, CreateCookie } from '@/app/lib/utils'
import { CheckIfUserExist } from "@/app/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// To handle a POST request to /api
export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email').toLowerCase();
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordconfirmation');
  
  // Check if all fields were submitted
  if(!email || !password || !username || !passwordConfirmation)
    return NextResponse.json({ invalid:"Please input all fields." }, { status: 400 });
  
  if(password !== passwordConfirmation)
    return NextResponse.json({ password:"Those passwords did not match. Try again." }, { status: 400 });

  if(password.length < 3)
    return NextResponse.json({ password:"Password must be at least 3 characters long" }, { status: 400 });

  let user;
  try {
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
  const sessionId = uuidv4();
  user = await CreateUser(username, email, hashedPassword, sessionId);
  
  if(!user)
    return NextResponse.json({ error :"Failed to create user. Please try again later." }, { status: 500 });

  const session = await CreateSession(user, sessionId);
  await CreateCookie(session);
  return NextResponse.json({success: true}, {status: 200});
}

async function CreateUser(username, email, password, sessionId)
{
    try {
        const user = await prisma.user.create({
            data: {
              username,
              email,
              password,
              sessionId,
            }
        })
        
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function GeneratePasswordHash(password)
{
  return await bcrypt.hash(password, 12);
}
