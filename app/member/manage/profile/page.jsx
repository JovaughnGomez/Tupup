import React from 'react'
import Image from 'next/image';
import styles from './profile.module.css'
import InputBox from '@/app/components/InputBox';
import { ConvertDateToString } from '@/app/lib/clientUtils';
import { GetProfileDTO } from '@/data/user-dto';

async function page() {
    const userData = await GetProfileDTO();
    const dateJoinedReadable = ConvertDateToString(userData.joined);

  return (
    <>
        <h1>USER PROFILE</h1>
        <div className={styles.contentWrp}>
            <div className={styles.innerWrp}>
                <div className={styles.profileWrp}>
                    <div className={styles.profileInner}>
                        <div className={styles.title}><h3>My Photo</h3></div>
                        <div className={`${styles.inner} ${styles.changePhotoWrp}`}>
                            <Image 
                                src="/img/user/avatar/p.webp"
                                width={72}
                                height={72}
                            />
                            <label id='change_photo' className={styles.photoControlsWrp}>
                                <div className={styles.photoBtn}>   
                                    <span>Change Photo</span>
                                    <input type="file" className={"hideInput"} />
                                </div>
                            </label>
                            <div id='upload_photo' className={`hide ${styles.photoControlsWrp}`}>
                                <div className={styles.photoBtn}>   
                                    <span>Save</span>
                                </div>
                                <div className={styles.photoBtnCancel}>   
                                    <span>Cancel</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                <div className={styles.profileWrp}>
                    <div className={styles.profileInner}>
                        <div className={styles.title}><h3>Username</h3></div>
                        <div className={`${styles.inner} ${styles.changeUsernameWrp}`}>
                            <form action="" method='post' className={styles.usernameForm}>
                                <input type="hidden" name='csrfToken' value={"OK"}/>
                                <div>
                                    <InputBox name={"username"} defaultVal={userData.username} />
                                </div>
                                <label id='change_username' className={styles.photoControlsWrp}>
                                    <div className={styles.photoBtn}>   
                                        <span>Save</span>
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={styles.profileWrp}>
                    <div className={styles.profileInner}>
                        <div className={styles.title}><h3>User Information</h3></div>
                        <div className={`${styles.inner}`}>
                            <div className={styles.userInfoWrp}>
                                <div className={styles.infoLabel}>Email</div>
                                <div>{userData.email}</div>
                                {/* <div className={styles.infoLabel}>Mobile Phone</div>
                                { number.length > 0 ?
                                ( 
                                    <span>{number}</span>
                                ):
                                (
                                    <a href="/member/manage/mobile" className={styles.link}>Add mobile phone number</a>
                                )} */}
                                <div className={styles.infoLabel}>Joined</div>
                                <div>{dateJoinedReadable}</div>
                            </div>
                            {/* <div className={styles.informationField} data-label="Email:">
                                <span>{email}</span>
                            </div>
                            <div className={styles.informationField} data-label="Mobile Phone:">
                            </div>
                            <div className={styles.informationField} data-label="Joined">
                                <span>{ConvertDateToString(dateJoined)}</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default page