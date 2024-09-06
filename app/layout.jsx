import { Manrope} from 'next/font/google'
import "./globals.css";
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { GetSessionFromCookies } from './lib/utils';

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
  let isOnline = false;
  if(session && session.sessionId)
    isOnline = true;

  return (
    <html lang="en">
      <body className={manrope.className}>
        <Nav isOnline={isOnline}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
