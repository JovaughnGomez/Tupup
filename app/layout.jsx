import { Manrope} from 'next/font/google'
import "./globals.css";
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { GetSessionFromCookies } from './lib/session';
import { GetUserFromMap, ListAll } from './services/userCache';
import { GetNavDTO } from '@/data/user-dto';
import { GetCurrentUser } from './lib/auth';

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight:['400','500','600','700','800'],
  variable: '--font-manrope',
})

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
};

export default async function RootLayout({ children }) {
  const session = await GetSessionFromCookies();
  let userInfo = null;
  if(session && session.sessionId)
    userInfo = await GetNavDTO();

  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <Nav userInfo={userInfo}/>
        <div className={userInfo && userInfo.isAdmin ? "adminBody" : "body2"}>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
