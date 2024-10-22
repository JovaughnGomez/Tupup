import React from 'react';
import styles from '@/public/css/ControlPanel.module.css'
import NavigationLinks from '@/app/components/NavigationLinks';
import { GetCurrentUserFromMap } from '../lib/auth';
import { redirect } from 'next/navigation';

export default async function ControlPanelLayout({ children }) {
    const currentUser = await GetCurrentUserFromMap();
    if(!currentUser)
        redirect("/login");

    return (
        <div>
            <div className={styles.controlPanelWrp}>
                <div className={styles.controlPanelInner}>
                    <div className={`${styles.panelNavigation}`}>
                        <NavigationLinks id="panel_nav" styles={styles}/>
                    </div>
                    <div className={styles.contentWrp}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}