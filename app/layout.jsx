import { Manrope} from 'next/font/google'
import "./globals.css";
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { GetSessionFromCookies } from './lib/session';
import { GetNavDTO } from '@/data/user-dto';
import { DeliverGameTopup } from './services/deliveryService';

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

  // const order = {
  //   quantity: 1,
  //   info: null,
  //   id: '38ab79d7-5236-40a9-a5ec-66dd1d89e73f',
  //   product: {
  //     usdValue: 0.99,
  //     name: '100 Diamonds',
  //     salePrice: 15,
  //     price: 17,
  //     productCategory: { name: 'freefire', type: 'game-topup' }
  //   }
  // }

  // const job = await DeliverGameTopup(order, order.product.productCategory.name);

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
