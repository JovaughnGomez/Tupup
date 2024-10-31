
"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import Icon from '@mdi/react'
import { mdiAccount, mdiListBox, mdiHistory, mdiLogout, mdiCreditCard, mdiCurrencyUsd, mdiCellphone, mdiLock, mdiAccountBadge, mdiAccountBox  } from '@mdi/js';
function NavigationLinks({id, styles, toggleMenu, onLogout}) {
    const pathname = usePathname();
    const [linkPath, setLinkPath] = useState(1)
    let useDefaultNav = !pathname.startsWith("/member/manage");
    useEffect(() => {
        setLinkPath(pathname);
    }, [pathname])

  return (
    <>
        {useDefaultNav ? (
            <div id={id} className={`${styles.welcome}`}>
                <ul className={styles.user_menu}>
                    <Link onClick={toggleMenu} className={`toggleSidebar ${linkPath == "/member/account" ? styles.activeNav : ""}`} href="/member/account">
                        <span className={styles.navTextStyle}>
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiAccount} size={1} /> 
                            </span> 
                            <p className={styles.navText}>My Account</p>
                        </span>
                    </Link>

                    <Link onClick={toggleMenu} className={`toggleSidebar ${linkPath == "/member/topup" ? styles.activeNav : ""}`} href="/member/topup">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiCurrencyUsd} size={1} /> 
                            </span> 
                            <p className={styles.navText}>Top Up</p>
                        </span>
                    </Link>

                    <Link onClick={toggleMenu} className={`toggleSidebar ${linkPath == "/member/orders" ? styles.activeNav : ""}`} href="/member/orders">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiListBox} size={1} /> 
                            </span> 
                            <p className={styles.navText}>My Orders</p>
                        </span>
                    </Link>

                    <Link onClick={toggleMenu} className={`toggleSidebar ${linkPath == "/member/cards" ? styles.activeNav : ""}`} href="/member/cards">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiCreditCard} size={1} /> 
                            </span> 
                            <p className={styles.navText}>My Cards</p>
                        </span>
                    </Link>

                    <Link onClick={toggleMenu} className={`toggleSidebar ${linkPath == "/member/transactions" ? styles.activeNav : ""}`} href="/member/transactions">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiHistory} size={1} /> 
                            </span> 
                            <p className={styles.navText}>Transactions</p>
                        </span>
                    </Link>  

                    <a href='/logout' className={`toggleSidebar`}>
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiLogout} size={1} /> 
                            </span>
                            <p className={styles.navText}>Logout</p>
                        </span>
                    </a>
                </ul>
            </div>
        ) : (
            <div id={id} className={`${styles.welcome}`}>
                <ul className={styles.user_menu}>
                    <Link className={`toggleSidebar ${linkPath == "/member/manage/profile" ? styles.activeNav : ""}`} href="/member/manage/profile">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiAccountBox} size={1} /> 
                            </span> 
                            <p className={styles.navText}>User Profile</p>
                        </span>
                    </Link>

                    <Link className={`toggleSidebar ${linkPath == "/member/manage/change-password" ? styles.activeNav : ""}`} href="/member/manage/change-password">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiLock} size={1} /> 
                            </span> 
                            <p className={styles.navText}>Change Password</p>
                        </span>
                    </Link>

                    <Link className={`toggleSidebar ${linkPath == "/member/account" ? styles.activeNav : ""}`} href="/member/account">
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiAccount} size={1} /> 
                            </span> 
                            <p className={styles.navText}>My Account</p>
                        </span>
                    </Link>

                    <a href='/logout' className={`toggleSidebar`}>
                        <span className={styles.navTextStyle}> 
                            <span className={styles.nav_icon_wrp}> 
                                <Icon className={styles.nav_icons} path={mdiLogout} size={1} /> 
                            </span>
                            <p className={styles.navText}>Logout</p>
                        </span>
                    </a>
                </ul>
            </div>
        )}
    </>
  )
}

export default NavigationLinks