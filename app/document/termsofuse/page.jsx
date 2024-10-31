import React from 'react'
import styles from './termsofuse.module.css'

function page() {

  return (
    <div className={styles.contentWrapper}>
      <h1 className='uppercase'>Terms Of Use</h1>
      <p>{process.env.EULA_DATE}</p>
      <p>Welcome to Game Haven! These Terms of Use (“Terms”) govern your use of the Game Haven website (“Site”) and services. By accessing or using our Site, 
        you agree to these Terms. Please read them carefully. If you do not agree with these Terms, you should not use our services.</p>

      <div className={styles.section} id='section-01'>
        <h2>1. Definitions</h2>
        <p>In these Terms of Use, the following words and expression shall have the following meanings unless the context otherwise requires:</p>
        <p>Game Haven Wallet: A virtual wallet within Game Haven that users can top up via Digicel or Bmobile phone cards and use for purchases on the platform.</p>
        <p>Item: Non-refundable digital items, such as gift cards or game top-ups, delivered to the user.</p>
        <p>Account: The personal account a user creates to access Game Haven services. </p>
        <p>User: Any individual who creates an account on Game Haven and accesses or uses the Site.</p>
        <p>Site: The Game Haven website and any related services provided by Game Haven. </p>
      </div>

      <div id='section-02'>
        <h2>2. License to Use</h2>
        <p>In consideration of you agreeing to these Terms of Use and your continuing observance and compliance of these Terms of Use, 
          Game Haven hereby grants you a non-exclusive, non-transferable licence to access the Platform and use the Services upon the terms and subject to the conditions stated herein.</p>
      </div>
      
      <div className={styles.section} id='section-03'>
        <h2>3. Representations and Warranties</h2>
        <p>Each time when you access the Platform (or any of them), you irrevocably and unconditionally represent and warrant that you are of Legal Age. 
          Should you be below the Legal Age, you must get permission from a parent or legal guardian to register an Account and that parent or legal guardian must agree 
          and have consented to these Terms of Use on your behalf:</p>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>1.</span>
          <p>your personal information and the documentation submitted in this respect, including, without limitation, your full name, telephone number, 
            correspondence address and email address, are true and accurate. You shall forthwith notify us in writing of any changes in your personal information;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>2.</span>
          <p>you shall keep the password to the Account secure and confidential. You shall not at any time and under any circumstances reveal or disclose your password to 
            the Account to any unauthorized party and shall take all steps to prevent the disclosure of the password to the Account to any unauthorized party;</p>
        </div>

        <p>You shall not, and agree and undertake to Game Haven not to:</p>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>1.</span>
          <p>use the Services to impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>2.</span>
          <p>directly or indirectly, use the Services for any commercial purposes, save as otherwise permitted by Game Haven;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>3.</span>
          <p>use the Platform or the Services (or any of them) to conduct any fraudulent, immoral or illegal activities or such activities that may infringe 
            the intellectual property rights of third parties or obtain any advantage, benefit or secret profit from any third party;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>4.</span>
          <p>use any Intellectual Property belonging to Game Haven or any other third-party proprietors listed on the Platform, including, without limitation, 
            trademarks or trade names, whether registered or not, without the prior written consent of Game Haven;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>5.</span>
          <p>take any action that may undermine or manipulate the feedback or ratings system;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>6.</span>
          <p>be disruptive, be offensive or be a nuisance in any manner whatsoever to other users of the Platform or the employees of Game Haven;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>7.</span>
          <p>attempt to decompile, reverse engineer, disassemble or hack the Services (or any portion thereof), or to defeat or overcome any encryption technology or 
            security measures implemented by us with respect to the Services and/or data transmitted, processed or stored by us;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>8.</span>
          <p>harvest or collect any information about or regarding other Account holders, including, without limitation, any personal or business information;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>9.</span>
          <p>upload, email, post, transmit or otherwise make available any unsolicited or unauthorized advertising, promotional materials, ‘junk mails’, ‘spam’, 
            ‘chain letters’, ‘pyramid schemes’ or any other unauthorized form of solicitation;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>10.</span>
          <p>upload, email, post, transmit or otherwise make available any material that contains software viruses, worms, Trojan-horses or any other computer code, routines, 
            files or programs designed to directly or indirectly interfere with, manipulate, interrupt, destroy or limit the functionality or integrity of any computer software 
            or hardware or data or telecommunications equipment;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>11.</span>
          <p>interfere with, manipulate or disrupt the Services or servers or networks connected to the Services or any other use and enjoyment of the Services, 
            or disobey any requirements, procedures, policies or regulations of networks connected to the Platform;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>12.</span>
          <p>take any action or engage in any conduct that could directly or indirectly damage, disable, overburden, or impair the Services or the servers or networks connected to the Services;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>13.</span>
          <p>use the Services to intentionally or unintentionally violate any applicable local, state, national or international law, rule, regulation, code, directive, 
            guideline or policy including, without limitation, laws and requirements (whether or not having the force of law) relating to anti-fraud, anti-money laundering, 
            counter-terrorism, unlawful proceeds and anti-corruption;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>14.</span>
          <p>use the Services in violation of or to circumvent any sanctions or embargo administered or laws enforced;;</p>
        </div>

        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>15.</span>
          <p>reproduce, attempt to reproduce or counterfeit Item; and</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>16.</span>
          <p>directly or indirectly recruit and/or poach any customers obtained from the usage of the Platform.</p>
        </div>
      </div>
      
      <div className={styles.section} id='section-04'>
        <h2>4. User ID</h2>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>1.</span>
          <p>A User ID will be provided to you, where you will be entitled to set the password and/or security code for your Account subject always to certain requirements 
            as may be then notified. In registering with Game Haven, you agree to provide accurate, current, and complete information about yourself, and to update that information 
            if it changes; if you don’t, we have the right to close your Account and any web pages and/or other pages and/or reports created under your Account with Game Haven. 
            If we rely on the contents of your application and accept you to use our Services, you irrevocably agree that you shall indemnify and keep us indemnified and hold us 
            harmless for any expense, loss or damage that we may suffer arising from any inaccurate or false statement or misrepresentation of facts submitted by us to you. If you 
            select a User ID that we, in our sole discretion, find offensive or inappropriate, we have the right to suspend or terminate your Account.</p>
        </div>
      </div>

      <div className={styles.section} id='section-05'>
        <h2>5. Use of Services</h2>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>1.</span>
          <p>You shall procure, at your own costs and expenses, the requisite equipment and software to connect and access the Platform and the ensuing use of the Services. 
            You shall bear all charges and fees imposed by third parties in relation to and in connection with you connecting your equipment to the Platform (or any of them).
            </p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>2.</span>
          <p>It is your primary responsibility to ensure that you are acquainted with the guidelines and procedures for the use of the Services that Game Haven may issue 
            from time to time. Game Haven shall not be liable for any errors, losses or damages caused by your use of the Services.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>3.</span>
          <p>It is your responsibility to secure the information of your Account. Any notification or confirmation received by Game Haven from your Account shall be deemed to have 
            been issued by you notwithstanding that such notification or confirmation may have been issued by a third party, whether authorized or otherwise, and you shall be 
            bound by such notification or confirmation.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>4.</span>
          <p>Game Haven shall not be liable for acting on the notification or confirmation sent through your Account. Game Haven shall not be obliged to investigate the authenticity or 
            authority of persons effecting the notification or confirmation or verify the completeness of such notification or confirmation. Such notification or confirmation 
            shall be deemed irrevocable and binding on you upon receipt by Game Haven notwithstanding any error, fraud, forgery and lack of clarity or misunderstanding in respect of the 
            terms of such notification or confirmation. You shall immediately notify Game Haven upon receipt of incomplete, garbled or inaccurate data or information from Game Haven. 
            You shall also immediately notify Game Haven upon receipt of any data or information which is not intended for you and you shall delete such data or information from your 
            Account.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>5.</span>
          <p>We may at any time or from time-to-time sub-contract and/or appoint our subsidiaries, affiliates, related entities and/or any third-party service provider(s) 
            to operate the Platform and/or provide the Services and/or part thereof on our behalf at our absolute discretion. We shall have the rights to delegate, transfer, 
            assign or novate, in whole or in part, our rights, benefit or obligations to our subsidiaries, affiliates, related entities or appointed third party service provider(s) 
            without your consent and without notice to you.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>6.</span>
          <p>Unless otherwise permitted by Game Haven in writing, you shall not upload, post, email, transmit or otherwise make available any unauthorized or illegal activities on
             the Platform or directly to other users of the Platform.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>7.</span>
          <p>You shall not upload, post, email, transmit or in any other manner whatsoever make available any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunication equipment, including, without limitation, the Platform.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>8.</span>
          <p>You irrevocably and unconditionally allow and permit Game Haven to send to your Account updates on services and events offered or provided by Game Haven.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>9.</span>
          <p>Third party links may be provided throughout the Platform. These links are provided as a courtesy only, and the sites they link to are not under our control in any manner whatsoever and you therefore access them at your own risk. We are in no manner responsible for the contents of any such linked site or any link contained within a linked site, including any changes or updates to such sites. We provide these links merely as a convenience, and the inclusion of any link does not in any way imply or express affiliation, endorsement or sponsorship by us of any linked site and/or any of its content therein.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>10.</span>
          <p>You acknowledge that by accessing or using the Platform, you may be exposed to Content that you may consider to be offensive, indecent or objectionable. To the fullest extent permitted by applicable law, under no circumstances shall we be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of, or reliance on, any Content posted, emailed, transmitted or otherwise made available on the Platform.</p>
        </div>
      </div>

      <div className={styles.section} id='section-06'>
        <h2>6. Goods & Services</h2>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>1.</span>
          <p>All items reflected in the Account are granted to you on a limited and revocable licence basis, use of which shall be in accordance with such terms as Game Haven may impose from time-to-time.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>2.</span>
          <p>The value of the items reflected in the Account does not represent any credit value in real currency. The items cannot be exchanged for real cash.</p>
        </div>
        <div className={styles.indentedWrappers}>
          <span className={styles.indent}>3.</span>
          <p>Unless otherwise permitted by Game Haven in writing, you are prohibited from selling, transferring or otherwise disposing of the items to any other persons, whether within or outside the confines of the Platform (or any of them).</p>
        </div>
      </div>

        <div className={styles.section} id='section-07'>
          <h2>7. Availability of Services</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>We may release certain Services or their features in a beta or trial version, which may not work correctly or in the same way the final version may work, and we shall not be liable in such instances.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>Game Haven may from time-time-time require verification of your identity to confirm your ownership of your Account. This verification process is required for purposes including but not limited to: (i) fulfilling Game Haven’s obligations to the relevant authorities to combat against suspicious or unlawful activities, anti-money laundering activities and the funding of terrorism; (ii) enabling Game Haven to take action when unauthorized usage of Game Haven accounts has been detected; and (iii) resolving any disputes relating to the ownership of a Game Haven account.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>You hereby irrevocably authorize Game Haven, whether acting on its own or through its third-party service providers, to make any inquiries and to collect any documentation that it considers necessary to verify your identity. As part of this verification process, Game Haven shall request, and you shall provide to Game Haven, information about yourself that is true, accurate, current and complete, and which can be verified through documentation that is legally recognized and accepted in the location in which such documentation is issued.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>4.</span>
            <p>We reserve the right to change, modify, suspend or discontinue all or any part of the Platform and/or Services at any time or upon notice as required by applicable laws. We may also impose limits on certain features or restrict your access to parts of, or the entire Platform and/or Services in our sole discretion and without notice and any liability to you.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>5.</span>
            <p>For enhancement and improvement purposes, Game Haven may from time-to-time conduct software evaluation to assess the performance level of the Platform and/or Services. You hereby irrevocably grant to and authorize Game Haven to conduct periodical review on your Account, including but not limited to assessing the activities and/or transactions carried out by you on the Platform or via your Account.</p>
          </div>
        </div>

        <div className={styles.section} id='section-08'>
          <h2>8. Disclaimers, Exclusions and Force Majeure</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>You agree and confirm that you shall not hold Game Haven, its employees, agents or licensees, liable for any special, incidental or consequential damages arising out of and in relation to the Services or these Terms of Use.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>The Services are usually available on a daily basis unless otherwise specified herein. Whilst we endeavour to ensure that the Platform and/or Services are secured, you acknowledge and agree that the entire risk arising out of the access, use or performance of the Platform and/or the Services shall remain with you to the fullest extent permitted by applicable law.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>The Platform and/or Services are provided ‘as is’ and ‘as available’ basis without any warranties, claims or representations made by us of any kind either expressed, implied or statutory, including, without limitation, warranties of quality, performance, non-infringement, merchantability, or fitness for a particular purpose, nor are there any warranties created by course of dealing, course of performance, custom or trade usage. Without limiting the foregoing and to the fullest extent permitted by applicable law, we do not warrant that the Platform and/or Services or the functions contained therein will be available, accessible, uninterrupted, timely, secured, accurate, complete or error-free, that defects, if any, will be corrected, or that the Platform and/or the Server that makes the same available are free of viruses, clocks, timers, counters, worms, software locks, drop dead devices, Trojan-Horses, routings, trap doors, time bombs or any other harmful codes, instructions, programs or components.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <div className={styles.inner}>
              <span className={styles.indent}>4.</span>
              <p>To the fullest extent permitted by applicable law, in no event shall we be liable whether in contract, warranty, tort (including, without limitation, negligence (whether active, passive or imputed), product liability, strict liability or other theory), or other cause of action at law, in equity, by statute or otherwise for:</p>
            </div>
          </div>
          <div className={styles.indentedWrappers2}>
            <div className={styles.inner}>
              <span className={styles.indent}>1.</span>
              <p>(i) loss of use; (ii) loss of profits; (iii) loss of revenues; (iv) loss of data; (v) loss of goodwill; (vi) failure to realize anticipated savings, in each case whether direct or indirect; and</p>
            </div>
          </div>
          <div className={styles.indentedWrappers2}>
            <div className={styles.inner}>
              <span className={styles.indent}>1.</span>
              <p>Any direct or indirect, incidental, special, consequential, exemplary damages, arising out of or in connection with the use of or inability to use the Platform or the Services, including, without limitation, any damages resulting therefrom, even if we have been advised of the possibility of such damages.</p>
            </div>
          </div>
          <div className={styles.indentedWrappers}>
            <div className={styles.inner}>
              <span className={styles.indent}>4.</span>
              <p>Game Haven shall not be liable for any delay or failure to perform the Services, regardless of the cause of such delay or failure. Such causes may include but not limited to an Act of God, riot, civil commotion, strike (whether or not involving employees of Game Haven), lockout or other labour disturbance, fire, war, acts of foreign enemies, power outage, pandemics, epidemics, network congestion, telecommunications failure, electrical power failures, or any fault, interruption, disruption or malfunction of equipment, tools, utilities, communications, computer (software and hardware) services or networks, government order or change in any law or regulation which renders the performance impractical.</p>
            </div>
          </div>
          <div className={styles.indentedWrappers}>
            <div className={styles.inner}>
              <span className={styles.indent}>4.</span>
              <p>You acknowledge, accept, and agree that all disclaimers, exclusions and limitations of liability set out in these Terms of Use represent a fair and reasonable allocation of risks and benefits of the agreement between Game Haven and you, taking all relevant factors into consideration, including without limitation the value of the consideration provided to you by Game Haven. You further agree that these disclaimers, exclusions and limitations shall be enforceable to the fullest extent permitted by applicable law.</p>
            </div>
          </div>
        </div>

        <div className={styles.section} id='section-09'>
          <h2>9. Intellectual Property Rights</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>We grant you a limited and revocable licence to access and use the incidental software provided by us to you via the Platform as part of the Services. Use of such software is subjected to these Terms of Use. Any third-party scripts or code, linked to or referenced from the Services, are licensed to you by the third parties that own such scripts or code. You shall not, directly or indirectly, modify the features or functionality of, copy or create derivative works using all or any portion of, analyse or remove components from, decompile, or otherwise reverse engineer or attempt to reverse engineer or derive source code, techniques, algorithms or processes from the software or permit or encourage any third party to do so.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>All proprietary Content and Intellectual Property displayed on the Platform are the exclusive property of Game Haven and where applicable, third-party proprietors. No right or licence is granted directly or indirectly to any party accessing the Platform to use or reproduce any Intellectual Property, and no party accessing the Platform shall claim any right, title or interest therein. By using or accessing the Services, you agree to comply with the copyrights, trademarks, applicable intellectual property related legislations and all other applicable laws that protect the Services, the Platform and its Content. You agree not to copy, distribute, republish, transmit, publicly display, publicly perform, modify, adapt, rent, sell or create derivative works of any portion of the Services, the Platform or its Content. You also may not, unless with our prior written consent, mirror or frame any part or whole of the contents of the Platform on any other server or as part of any other website. In addition, you agree that you will not use any robot, spider or any other automatic device or manual process to monitor or copy our Content, without our prior written consent (such consent is deemed given for standard search engine technology employed by Internet search websites to direct Internet users to this website).</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>Any Submission is not considered confidential by Game Haven and may be disseminated or used by us without compensation or liability to you for any purpose whatsoever, including, but not limited to, developing and marketing goods. By making a Submission to Game Haven, you acknowledge and agree that we and/or other third parties may independently develop software, applications, interfaces, goods and modifications and enhancements of the same which are identical or similar in function, code or other characteristics to the ideas set out in your Submission. Accordingly, you hereby grant to us and our successors a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, sub-licensable and transferable licence to develop the goods identified above, and to use, copy, distribute, republish, transmit, modify, adapt, create derivative works of, publicly display, and publicly perform any Submission on, through or in connection with the Services in any media formats and through any media channels, including, without limitation, for promoting and redistributing part of the Services (and its derivative works). This provision does not apply to personal information that is subject to our Privacy Policy except to the extent that you make such personal information publicly available on or through the Services.</p>
          </div>
        </div>
        <div className={styles.section} id='section-10'>
          <h2>10. Reliability Of Platform</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>You are aware that all transactions conducted on the Platform are through telecommunication and data networks.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>You are fully aware that your receipt of the notification from Game Haven and vice versa may be delayed or prevented by factors affecting the relevant service providers and other relevant parties. You accept that Game Haven cannot guarantee the prompt delivery of such notification or confirmation.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>You acknowledge and confirm that you shall take all steps and measures to check and verify the transaction history of your Account.</p>
          </div>
        </div>

        <div className={styles.section} id='section-11'>
          <h2>11. Account</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>You shall immediately notify Game Haven if you are aware or believe your Account has been hacked or compromised.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>You shall be liable for all transactions conducted through your Account at any time prior to the receipt by Game Haven of your notification as stated in Clause 14.</p>
          </div>
        </div>

        <div className={styles.section} id='section-12'>
          <h2>12. Disclosure of Information</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>Game Haven shall be entitled and you irrevocably and unconditionally consents and authorises Game Haven to the extent permitted by law, to disclose or release any information pertaining to you or your transactions through the Platform to such extent that Game Haven may at its absolute discretion deem fit to:</p>
          </div>
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>1.</span>
            <p>such persons as Game Haven may be required to disclose under the applicable law;</p>
          </div>
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>2.</span>
            <p>such other persons or entity pursuant to any governmental directive or order of the court;</p>
          </div>
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>3.</span>
            <p>enforce these Terms of Use;</p>
          </div>
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>4.</span>
            <p>respond to your requests for customer service; or</p>
          </div>
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>5.</span>
            <p>any other party whomsoever as Game Haven deems fit.</p>
          </div>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>Save as otherwise permitted in these Terms of Use, Game Haven will not disclose your personal information to any other party without prior notification to you.</p>
          </div>
        </div>

        <div className={styles.section} id='section-13'>
          <h2>13. Applicable Laws and Indemnity</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of Trinidad and Tobago without regard to the conflict or choice of law principles. Any dispute, legal action or proceeding arising out of or in connection with these Terms of Use shall be submitted to the jurisdiction of the Trinidadian courts, unless Game Haven in its own discretion chooses to submit the same for settlement via arbitration in Trinidad or otherwise.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>Where required, you shall obtain the approval or consent or permission of the relevant regulatory authorities prior to using the Services.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>For cross-border transactions, you shall not violate the laws existing in the countries involved in the transaction.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>4.</span>
            <p>You agree to indemnify, defend and hold us harmless, and our shareholders, subsidiaries, affiliates, related entities, directors, officers, agents, representatives, co-branders and employees (collectively, the ‘Indemnified Parties’) from and against any and all claims, actions, proceedings and suits and all related liabilities, damages, settlements, penalties, fines, costs and expenses (including, without limitation, the legal costs and dispute resolution expenses) incurred by any Indemnified Party arising out of or relating to: (i) your violation or breach of any of these Terms of Use or any policy or guideline referenced herein; (ii) your use or misuse of the Platform or Services, or (iii) your breach of any laws or any rights of a third party</p>
          </div>        
        </div>
        
        <div className={styles.section} id='section-14'>
          <h2>14. Suspension, Termination, Cancellation of Services</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>The Services (or any part thereof) may be cancelled by Game Haven at any time without prior notice to you. After cancellation, the Services (or any part thereof) may be reinstated in such manner and on such Terms of Use as Game Haven may at its absolute discretion determine.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>You may deactivate your Account at any time you notify us of your desire to do so, subject always to a closure fee as chargeable by us on you, if any.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>Game Haven reserves the right at all times to suspend or block access to and use of the Services (or any part thereof) for any reason whatsoever and for any length of time and upon any conditions that Game Haven may at its absolute discretion determine. Grounds for suspension or termination may include, but not limited to:</p>
          </div>     
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>1.</span>
            <p>the Account has been inactive for a consecutive period of 36 months or any other period as determined by Game Haven;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>2.</span>
            <p>having multiple user accounts or allowing unauthorized persons to access and use the Account;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>3.</span>
            <p>in our opinion, there is dishonesty, suspected fraud, illegality, criminality or misrepresentation in the conduct of your Account or your use of the Platform and/or Services;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>4.</span>
            <p>you are in breach or we have reasonable grounds to believe that you have breached any of these Terms of Use and/or any applicable terms and conditions as may be provided by Game Haven from time-to-time, or have engaged in any conduct prejudicial to Game Haven or in our opinion, your acts are prejudicial to Game Haven’s interest;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>5.</span>
            <p>you are in breach of any acts, statute, laws, by-laws, rules, regulations, guidelines and/or policies by any authority, regulatory body or government agency;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>6.</span>
            <p>you have acted in bad faith or with malicious intent, or that we have reasonable grounds to believe that your behaviour is harmful, of defamatory nature or abusive to other user, third parties and/or Game Haven;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>7.</span>
            <p>your name is listed under any regulatory watchlist (including but not limited to listing related to terrorism and terrorism financing under the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001 (AMLATFPUAA) and/or related to bribery and corruption under the Malaysian Anti-Corruption Commission Act 2009 (MACCA) and/or such other local, foreign or international laws and regulations of similar nature;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>8.</span>
            <p>if we are required to do so pursuant to an order of a court or by any governmental or regulatory authority having the relevant jurisdiction;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>9.</span>
            <p>you have submitted false documents or have declared false information during your registration with or application to Game Haven; and/or</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>10.</span>
            <p>you fail to provide any additional information which we may request from you from time-to-time for verification purposes.</p>
          </div>     
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}></span>
            <p>Use of the Platform, Services and/or Account for suspicious, fraudulent, illegal, harassing, defamatory, threatening or abusive purposes may be referred by us to the relevant law enforcement authorities without notice to you.</p>   
          </div>     
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>4.</span>
            <p>Upon cancellation or termination of the Services (or any part thereof):</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>1.</span>
            <p>where feasible, the unused Game Haven Wallet Funds will be refunded to you. In the event refund is not feasible as determined by Game Haven, you shall be entitled to utilize the Game Haven Wallet Funds for a specific time of period as advised by Game Haven, subject to the Terms of Use here and any such terms and conditions as Game Haven may determine;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>2.</span>
            <p>you shall immediately pay to Game Haven all outstanding fees and charges due and owing to Game Haven, failing which Game Haven shall have full discretion to commence civil actions against you, including without limitation, a claim for damages, specific performance and/or interim or injunctive relief;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>3.</span>
            <p>Game Haven may at its absolute discretion, decide not to act on any request received by Game Haven after the effective date of termination;</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>4.</span>
            <p>Game Haven may at its absolute discretion, decide not to act on any confirmation or request received by Game Haven between the date of notice is given to you and the effective date of termination (if there is a lapse of time between the two dates); and/or</p>
          </div>        
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>5.</span>
            <p>you hereby irrevocably and unconditionally authorise Game Haven to deduct all money due and owing by you to Game Haven (if any) from the moneys that are payable by Game Haven to you.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>5.</span>
            <p>Further to the above, in the event that your access and/or utilization of the Platform and/or Services is suspended, ceased or terminated by us due to suspicious, fraudulent, illegal or unlawful transactions including but not limited to breaches of any law (including but not limited to the Financial Services Act 2013, AMLATFPUAA and/or MACCA or any rules, regulations, policies and/or guidelines made thereunder), you will not be able to continue to utilize your GAME HAVEN FUNDS and shall not be entitled to obtain any money or refund whatsoever. It shall be lawful for Game Haven to retain for an indefinite period, or deal at its own discretion with, or release to the relevant authorities, any money or refund (including your Game Haven Credits) in accordance with applicable legislations, rules, regulation and/or guidelines. You shall not be entitled to claim any form of compensation for any loss arising therefrom.</p>
          </div>        
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>6.</span>
            <p>Any provision of these Terms of Use which expressly or by implication is intended to continue to remain effective and binding on you after the deactivation of Account and/or the termination of Services, shall survive such termination.</p>
          </div>        
        </div>

        <div className={styles.section} id='section-15'>
          <h2>15. Notices</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>All notices, demands, requests or other communications to be given or made under these Terms of Use shall be in writing, and shall be sufficiently given or made to the other party by serving such notice at or sending such notice by hand, registered post or electronic mail to the contact details as notified by one party to the other from time-to-time or via the communication channel made available on the Platform.</p>
          </div>  
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>Notice shall be deemed given</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>1.</span>
            <p>in the case of hand delivery, upon the receipt of written acknowledgment signed by the recipient;</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>2.</span>
            <p>in the case of registered post, five (5) business days after posting; and</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>3.</span>
            <p>in the case of email or the communication channel available on the Platform, on the day of transmission provided that the sender has not received a failed or undeliverable message from the host provider of the recipient within the day of transmission.</p>
          </div>  
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>3.</span>
            <p>Notwithstanding the above and in addition to the above methods of delivery, any notice or document or communication given by Game Haven to you shall be deemed to be served in the following manner:</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>1.</span>
            <p>posting the notice or communication in the Platform;</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>2.</span>
            <p>notices placed through any media; or</p>
          </div>  
          <div className={styles.indentedWrappers2}>
            <span className={styles.indent}>3.</span>
            <p>any manner of notification as Game Haven may at its absolute discretion determine.</p>
          </div>  
        </div>

        <div className={styles.section} id='section-16'>
          <h2>16. Waiver and Severance</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>Any failure by Game Haven to enforce at any time or for any period any one or more of these Terms of Use shall not be a waiver of them or of the right at any time subsequently to enforce these Terms of Use.</p>
          </div>  
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>In the event that any provisions of these Terms of Use is declared by any judicial or other competent authority to be void, voidable, illegal or otherwise unenforceable Game Haven shall amend that provision in such reasonable manner as would achieve the intention of Game Haven or at the discretion of Game Haven it may be severed from these Terms of Use and the remaining provisions remain in full force and effect.</p>
          </div>  
        </div>

        <div className={styles.section} id='section-17'>
          <h2>17. Variation</h2>
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>1.</span>
            <p>These Terms of Use may be modified, added to, deleted or varied by Game Haven by way of posting on the Platform or in any such other manner as Game Haven may in its absolute discretion determine.</p>
          </div>  
          <div className={styles.indentedWrappers}>
            <span className={styles.indent}>2.</span>
            <p>You agree that continued use of the Services shall constitute your acceptance of these Terms of Use (as modified and varied from time to time).</p>
          </div>  
        </div>

        <div className={styles.section} id='section-18'>
          <h2>18. Assignment</h2>
          <p>You may not assign its rights under these Terms of Use without the prior written consent of Game Haven.</p>
        </div>

        <div className={styles.section} id='section-19'>
          <h2>19. Binding Effect</h2>
          <p>These Terms of Use shall be binding on your heirs, personal and legal representatives, estate, successors-in-title and permitted assigns (where applicable) you.</p>
        </div>
    </div>
  )
}

export default page