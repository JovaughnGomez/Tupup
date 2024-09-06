import React from 'react'
import Script from "next/script";
import styles from '@/public/css/footer.module.css';
import {FaFacebook, FaTiktok, FaInstagram, FaTwitter} from 'react-icons/fa'

function Footer() {
  return (
    <footer>
        <div id="footer_wrapper" className={styles.footer_wrapper}>
            <div id="footer_nav" className={styles.footer_nav}>
                <dl>
                    <dt><span>About {process.env.NEXT_PUBLIC_WEBSITE_NAME}</span></dt>
                    <dd className={styles.descDetail} ><a href="/about-us" target=''><span icon="+">About Us</span></a></dd>
                    <dd className={styles.descDetail} ><a href="/support" target='_blank'><span icon="+">Support</span></a></dd>
                    <dd className={styles.descDetail} ><a href="/contact-us" target='_blank'><span icon="+">Contact Us</span></a></dd>
                </dl>
                <dl>
                    <dt><span>Legal</span></dt>
                    <dd className={styles.descDetail} ><a href="/termsofuse" target='_blank'><span icon="+">Terms Of Use</span></a></dd>
                    <dd className={styles.descDetail} ><a href="/termsofsale" target='_blank'><span icon="+">Terms Of Sale</span></a></dd>
                    <dd className={styles.descDetail} ><a href="/privacypolicy" target='_blank'><span icon="+">Privacy Policy</span></a></dd>
                </dl>
                </div>
            </div>

            <div className={styles.footer_socials_wrapper}>
                <h3>Stay updated with us</h3>
                <div className={styles.footer_socials}>
                <a href="" target='_blank' title='Facebook'><span><FaFacebook className='socials' size={20} fill='white'/></span></a>
                <a href="" target='_blank' title='Instagram'><span><FaInstagram className='socials' size={20} fill='white'/></span></a>
                <a href="" target='_blank' title='TikTok'><span><FaTiktok className='socials' size={20} fill='white'/></span></a>
                <a href="" target='_blank' title='Twitter'><span><FaTwitter className='socials' size={20} fill='white'/></span></a>
            </div>
            <div id="footer_copyright">
                <h3 className={styles.copyright}>© 2024 {process.env.NEXT_PUBLIC_WEBSITE_NAME}</h3>
            </div>
            <Script type="text/javascript" src="/js/footer.js"></Script>
        </div>
    </footer>
  )
}

export default Footer