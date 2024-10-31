import React from 'react'
import styles from './contactus.module.css'
import Icon from '@mdi/react'
import { mdiEmail, mdiPhone, mdiSend } from '@mdi/js'
import inputStyles from '@/public/css/input.module.css'
import SubmitButton from '@/app/components/SubmitButton'
import { SendContactMessage } from '../lib/action'

function page() {
  return (
    <div className={styles.outerWrp}>
      <div className={styles.infoWrp}>
        <div className={styles.header}>
          <h1>Contact Us</h1>
          <p>Any question? We would be happy to help you!</p>
        </div>
        <ul className={styles.contactList}>
          <li className={styles.infoBoxWrp}>
            <Icon path={mdiPhone} size={1}/>
            <p>+0123456789</p>
          </li>
          <li className={styles.infoBoxWrp}>
            <Icon path={mdiEmail} size={1}/>
            <p>support@gamehaventt.com</p>
          </li>
          <li className={styles.infoBoxWrp}>
            <Icon path={mdiEmail} size={1}/>
            <p>business@gamehaventt.com</p>
          </li>
          <li className={styles.infoBoxWrp}>
            <Icon path={mdiEmail} size={1}/>
            <p>media@gamehaventt.com</p>
          </li>
        </ul>
      </div>

      <form className={styles.formWrp}>
        <div className={styles.namesWrapper}>
          <div className={styles.inputWrp}>
            <span>First Name:</span>
            <input placeholder='Your first name' className={`rectangularBorders ${inputStyles.input}`} type="text" />
          </div>
          <div className={styles.inputWrp}>
            <span>Last Name:</span>
            <input placeholder='Your last name' className={`rectangularBorders ${inputStyles.input}`} type="text" />
          </div>
        </div>
        <div className={styles.inputWrp}>
          <span>Email Name:</span>
            <input placeholder='youremail@email.com' className={`rectangularBorders ${inputStyles.input}`} type="text" />
        </div>
        <div className={styles.inputWrp}>
          <span>Phone Number:</span>
            <input placeholder='+(868)123-4567' className={`rectangularBorders ${inputStyles.input}`} type="text" />
        </div>
        <div className={styles.inputWrp}>
          <span>Message:</span>
          <textarea placeholder='Type your message here...' className={inputStyles.textarea} name="message"></textarea>
        </div>

        <SubmitButton onSubmit={SendContactMessage} fullWidth={true} rounded={false}>
          <div className={styles.submitInner}>
            <span className='font-bold'>Send Message</span>
            <Icon className={styles.sendIcon} path={mdiSend} size={1} />
          </div>
        </SubmitButton>
      </form>
    </div>
  )
}

export default page