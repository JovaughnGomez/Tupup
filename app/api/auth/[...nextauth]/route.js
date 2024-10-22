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
  callbacks: {
    async signIn({account, profile})
    {
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
        const username = await GetUsernameFromGmail(profile.email);
        const avatar = profile.picture;
        user = await CreateUser(username, profile.email, profile.email, avatar);

        if(!user)
          return false;
      }

      if(user.isAdmin)
        return false;

      const isAuthenticated = await AuthenticateUser(user);
      return isAuthenticated;
    }
  }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }