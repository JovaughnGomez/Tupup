import React from 'react';
import styles from '@/public/css/ControlPanel.module.css'
import NavigationLinks from '@/app/components/NavigationLinks';

export default function ControlPanelLayout({ children }) {
    return (
        <div className='mt-24'>
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