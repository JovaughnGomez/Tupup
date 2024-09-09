"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavigationLinks from './NavigationLinks'
import Image from 'next/image'
import styles from '@/public/css/nav.module.css'
import Icon from '@mdi/react';
import { mdiCartOutline, mdiMagnify, mdiCash, mdiWalletGiftcard, mdiGamepad } from '@mdi/js';
import { MdClose, MdAccountCircle } from 'react-icons/md'

const Nav = ({ isOnline, username="Jovaughn", email="jovaughn499@gmail.com" }) => { 
    const router = useRouter();
    const show = "show";
    const pathname = usePathname();
    const showNav = pathname !== "/login" && pathname !== "/register";
    const showDefaultLinks = !pathname.startsWith("/member/manage");

    function ToggleRightMenu(e)
    {
        let sidebar;
        if(isOnline)
            sidebar = document.getElementById("user_auth")
        else 
            sidebar = document.getElementById("loginSidebar");
    
        sidebar.classList.toggle(show);
    }

    function ToggleLeftMenu(e)
    {
        const sidebar = document.getElementById("navSidebar");
        sidebar.classList.toggle(show);
    }

    async function OnLogout(e)
    {
        const res = await fetch("/api/logout", {
            method: "POST",
            body:"",
        })
    
        const response = await res.json();
        if(res.status == 200)
            router.push("/login");

        ToggleRightMenu(e);
    }

    return (
        <>
        {showNav &&
            <nav id="navigation" className={styles.nav_wrapper}>
                <div className={styles.inner_nav_wrapper}>
                    
                    {/* Left Sidebar */}
                    <section id='navSidebar' className={styles.leftSidebarWrp}>
                        <div className={`${styles.leftSidebarInner}`}>
                            <MdClose id="user_close_btn" size={25} fill='white' className={styles.user_close_btn} onClick={ToggleLeftMenu}/>
                            <div className={styles.nav_logo}>
                                <Link href="/">
                                    <Image 
                                        src="/img/welcome.webp"
                                        alt="RentalDB Logo"
                                        width={40}
                                        height={40}
                                    />
                                </Link>
                            </div>
                            <div id="navigation" className={`${styles.welcome}`}>
                                <ul className={styles.navMenu}>
                                    <Link onClick={ToggleLeftMenu} className='toggleSidebar' href="/cards"><span className={styles.navTextStyle}><Icon className={`${styles.leftNavIcons} ${styles.nav_icons}`} path={mdiWalletGiftcard} size={1} /> <p className={styles.navText}>Gift Card</p></span></Link>
                                    <Link onClick={ToggleLeftMenu} className='toggleSidebar' href="/topups"><span className={styles.navTextStyle}><Icon className={`${styles.leftNavIcons} ${styles.nav_icons}`} path={mdiCash} size={1} /> <p className={styles.navText}>Top-Up</p></span></Link>
                                    <Link onClick={ToggleLeftMenu} className='toggleSidebar' href="/accessories"><span className={styles.navTextStyle}><Icon className={`${styles.leftNavIcons} ${styles.nav_icons}`} path={mdiGamepad } size={1} /> <p className={styles.navText}>Accessories</p></span></Link>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div id='navBtns' className={styles.navBtnsWrp}>
                        <div className={styles.leftMenuWrp}>
                            <div className={styles.hamburger} onClick={ToggleLeftMenu}>
                                <div className={styles.hamburgerBar}></div>
                                <div className={`${styles.hamburgerBar2} ${styles.hamburgerBar}`}></div>
                                <div className={styles.hamburgerBar}></div>
                            </div>
                        </div>
                        
                        <div className={styles.rightMenuWrp}>
                            <div className={styles.menu}>
                                <div className={styles.user}>
                                    <a className={styles.searchIcon}  href="/search"><Icon path={mdiMagnify} size={1.1} /></a>
                                    {isOnline && <Icon className={styles.nav_icons} path={mdiCartOutline } size={1} /> }
                                    <MdAccountCircle id='user_btn' size={25} fill='white' onClick={ToggleRightMenu}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right ONLINE Sidebar */}
                    {isOnline && 
                        <section id='user_auth' className={styles.sidebarWrp}>
                            <div className={`${styles.sidebarInner}`}>
                                <div className={styles.user_menu_info}>
                                    <MdAccountCircle id='user_btn' size={35} fill='white'/>
                                    <div className={styles.name}>
                                        <span>{username}</span>
                                        <span>{email}</span>
                                    </div>
                                    <MdClose id="user_close_btn" className={styles.user_close_btn2} size={25} fill='white' onClick={ToggleRightMenu}/>
                                </div>  
                                {showDefaultLinks ? 
                                (
                                    <NavigationLinks isDefault={true} id="user_auth" styles={styles} toggleMenu={ToggleRightMenu} onLogout={OnLogout}/>
                                ) : (
                                    <NavigationLinks isDefault={false} id="panel_nav" styles={styles} toggleMenu={ToggleRightMenu} onLogout={OnLogout}/>
                                )}
                            </div>
                        </section>
                    }

                    {/* Right OFFLINE */}
                    {!isOnline && 
                        <section id='loginSidebar'className={`${styles.sidebarWrp}`}>
                            <div className={`${styles.sidebarInner}`}>
                                <MdClose id="user_close_btn" size={25} fill='white' className={styles.user_close_btn} onClick={ToggleRightMenu}/>
                                <div className={`${styles.welcome} ${styles.loginWelcome}`}>
                                    <Image 
                                        src="/img/welcome.webp"
                                        width={200}
                                        height={150}
                                    />
                                    <h3 className={styles.welcome_text} >Welcome To <b>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</b></h3>
                                    <div className={styles.user_btns}>
                                        <a href="/login" className={styles.signin}><span>SIGN IN</span> </a>
                                        <a href="/register" className={styles.signup}><span>SIGN UP</span></a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </div>
            </nav>
        }
        </>
    )
}

export default Nav