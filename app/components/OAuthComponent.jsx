import React from 'react'
import styles from '@/public/css/OAuthComponent.module.css'
import { signIn } from "next-auth/react"
import Image from 'next/image'

function OAuthComponent({ redirect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.instructions}>
        <span className={styles.separator}></span>
        <span className={styles.separatorText}>OR</span>
        <span className={styles.separator}></span>
      </div>
      <div className={`group ${styles.buttonWrapper}`} onClick={() => signIn("google", { callbackUrl: '/' })}>
        <div className={styles.innerBtnWrp}>
          <div className={`group-hover:scale-110 ${styles.googleIconWrp}`}>
            <Image 
              src={"/img/media/google.webp"}
              width={35}
              height={35}
              alt='Google'
            />
          </div>
          <button className={`group-hover:scale-105 ${styles.googleBtn}`}>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}

export default OAuthComponent