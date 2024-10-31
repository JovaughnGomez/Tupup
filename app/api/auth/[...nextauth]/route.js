import { AppError } from "@/app/lib/AppError";
import { AuthenticateUser, GetUsernameFromGmail } from "@/app/lib/auth";
import prisma from "@/server/prisma";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { CreateUser } from "../register/route";

const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({account, profile})
    {
      try {
        if(!profile?.email) 
          throw new AppError("Profile does not exist.", 400);
        
        let user;
        user = await prisma.user.findUnique({
          where: {
            baseEmail: profile.email,
          }
        })
        
        if(!user)
        {
          let username = await GenerateUsernameFromEmail(profile.email);
          username = username.replace(/\s/g,'')
          const avatar = profile.picture;
          user = await CreateUser(username, profile.email, profile.email, null, avatar);
  
          if(!user)
            return false;
        }
  
        if(user.isAdmin)
          return false;
  
        const isAuthenticated = await AuthenticateUser(user);
        return isAuthenticated; 
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }

async function GenerateUsernameFromEmail(email)
{
  let username = await GetUsernameFromGmail(email);
  let number = 0;
  let unique = false;

  while (!unique)
  {
    if(number > 0)
      username = username + number.toString();

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    unique = user ? false : true;
    number++;
  }

  return username;
}