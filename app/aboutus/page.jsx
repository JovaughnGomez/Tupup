import React from 'react'
import styles from './aboutus.module.css'
function page() {
  return (
    <div className={styles.wrapper}>
        <h1 className='text-center'>ABOUT GAME HAVEN</h1>
        <p className='text-center'><span className='font-bold'>Welcome to Game Haven,</span> where we’re redefining how gamers purchase digital products. We understand the passion for gaming and the need for quick, reliable transactions. 
        That’s why we’re committed to offering a seamless experience for our customers in Trinidad and Tobago, delivering everything from gift cards to direct game top-ups. No more long waits or complicated payment methods—at Game Haven, transactions are designed to be smooth and hassle-free, so you can dive into your game with ease.</p>
        <h1 className={`text-center ${styles.mission}`}>OUR MISSION</h1>
        <p className={`text-center`}>
          Our mission is to bring innovation and accessibility to the gaming community. With Game Haven, you can rely on <span className='font-bold accent'>fast, secure transactions</span> and a dedicated team that shares 
          your love for gaming. We’re here to support your journey. Join us as we create a new 
          standard for digital purchases—focused on speed, security, and a gamer-first approach.
        </p>
    </div>
  )
}

export default page