import React from 'react'
import OrderCheckout from './OrderCheckout';
import { FindCheckoutOrder } from '@/app/controllers/orderController';
import { GetSessionFromCookies } from '@/app/lib/session';
import { redirect } from 'next/navigation';

async function page({ searchParams }) {
    const { id } = searchParams;
    const session = await GetSessionFromCookies();
    if(!session)
        redirect("/login");

    const results = await FindCheckoutOrder(id, session.userId);
    if(!results.success)
        redirect("/");

    const order = results.order;
    return (
    <>
        <OrderCheckout csrfToken={session.csrfToken} order={JSON.stringify(order)} />    
    </>
  )
}

export default page