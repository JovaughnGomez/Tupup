import React from 'react'
import styles from './../termsofuse/termsofuse.module.css'

function page() {
  return (
    <div className={styles.contentWrapper}>
        <h1 className='uppercase'>Terms Of Use</h1>
        <p>{process.env.EULA_DATE}</p>
        <p>By making and confirming any order and/or purchase for any goods, products, and/or service on the Platform, you give your acceptance of and consent to these Terms of Sale. Your acceptance of these Terms of Sale shall constitute a legally binding agreement between GAME HAVEN and its subsidiaries and affiliates (individually and collectively, Game Haven, “WE”, “US” or “OUR”) and you as the buyer (“BUYER”, “YOU” or “YOUR”) in respect of the sale and purchase of any goods, products, and/or service on the Platform.</p>
        
        <div className={styles.section} id='Introduction'>
            <h2>1. Introduction</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The sale and purchase of any goods, products, and/or service (“Item”) on the Platform are governed by these Terms of Sale.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>We do not intend to sell any Item to any children or minors under the Legal Age. If you are below the Legal Age, you must get permission from a parent or legal guardian to purchase Items from us and that parent or legal guardian must agree to these Terms of Sale.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>We may modify these Terms of Sale without your consent and without notice to you at any time and form time-to-time by posting the revised and/or updated Terms of Sale on the Platform. You shall be deemed to have accepted the revised and/or updated Terms of Sale on the Platform upon your subsequent purchase of an Item.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>4.</span>
                <p>For the avoidance of doubt, these Terms of Sale shall be in addition but not in diminution of the Terms of Use of the Platform, as set out above. If there is any inconsistency between these Terms of Sale and the Terms of Use:</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>1.</span>
                <p>if regarding the access and usage of the Platform, the Terms of Use shall prevail; and</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>2.</span>
                <p>if regarding the sale and purchase of any Item, these Terms of Sale shall prevail.</p>
            </div>
        </div>

        <div id='Definition'>
            <h2>2. Definiton and Interpretation</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>In these Terms of Sale, unless the subject or context otherwise requires, the following words and expressions shall have the following meanings:</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>1.</span>
                <p>Account: means your account duly registered with Game Haven to facilitate you using the Services available on the Platform (or any of them);</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>2.</span>
                <p>Buyer: means a person who purchases Item on the Platform;</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>3.</span>
                <p>Contract: means the contract formed when Game Haven accepts an order placed by a Buyer on the Platform for the purchase of Item by issuance of a confirmation order.</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>4.</span>
                <p>Item: means any goods, product or service made available for sale on the Platform</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>5.</span>
                <p>Legal Age: means the legal age capable of giving consent hereunder pursuant to the applicable laws in your jurisdiction.</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>6.</span>
                <p>Platform: means collectively, the web platform presently known as gamehaventt.com and such other web and/or mobile platform administered and managed by Game Haven;</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>7.</span>
                <p>Service(s): means any service or function to be provided by Game Haven to the Buyer in conjunction with the sale and purchase of the Item in accordance with these Terms of Sale.</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>8.</span>
                <p>Terms of Sale: means these Terms of Sale and all additional terms and conditions and policies referenced herein and/or linked hereto and/or imposed by us from time-to-time, including but not limited to any future amendment, update or addendum made by Game Haven, as the case may be.</p>
            </div>

            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>Any technical term not specifically defined in these Terms of Sale shall be construed in accordance with the general practice of such relevant industry or profession in Trinidad & Tobago.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>For the purpose of calculating any period of time stipulated herein or when an act is required to be done within a specified period after or from a specified date, the period is inclusive of and time begins to run from the date specified.</p>
            </div>
        </div>

        <div id='BasisOfContract'>
            <h2>3. Basis of the Contract</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The information and details contained on the Platform do not constitute an offer for sale but rather an invitation to treat. No Contract in respect of any Item shall be formed until the Buyer’s receipt of a confirmation order issued by Game Haven confirming the Buyer’s purchase of Item.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>Any typographical clerical or other error or omission in any quotation, invoice or other document or information issued by Game Haven in its website shall be subjected to correction without any liability on the part of Game Haven.</p>
            </div>
        </div>

        <div id='Registration'>
            <h2>4. Registration of Game Haven Account</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>In order to place an order for purchase of Item, the Buyer is required to register and maintain an Account with Game Haven.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The registration, usage, suspension and termination of the Account are subjected to and shall be in compliance with the Terms of Use.</p>
            </div>
        </div>

        <div id='Order&Specifications'>
            <h2>5. Orders and Specifications</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The Buyer may make an offer to purchase Item by placing and completing the order form on the Platform and shall be responsible for ensuring the accuracy of the order. All orders shall be subject to Game Haven’s acceptance in its sole discretion, and each order accepted by Game Haven shall constitute a separate Contract.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>Order acceptance and formation of the Contract between the Buyer and Game Haven will be completed upon Game Haven issuing a confirmation order of the Item to the Buyer.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>No Cancellation</p>
            </div>
            <div className={styles.indentedWrappers}>
                <p>No order may be cancelled or no Contract may be terminated by the Buyer except with prior written consent from Game Haven, and on terms that the Buyer shall indemnify Game Haven in full against all loss (including loss of profit), costs (including the cost of all labour, materials used, and logistics), damages, charges, and expenses incurred by Game Haven as a result of the cancellation or termination, as the case may be.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>4.</span>
                <p>Subject to Clause 5.3 above, the Buyer may seek Game Haven’s consent to cancel the order or to terminate the Contract before Game Haven dispatches the Item by contacting Game Haven.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>5.</span>
                <p>Refusal of Order</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>1.</span>
                <p>Game Haven reserves the right to withdraw any Item from the Platform at any time and/or remove or edit any materials or content on the Platform at its sole discretion.</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>2.</span>
                <p>The Buyer hereby acknowledges that Game Haven will use its best efforts to always process all orders, but there may be unforeseen circumstances wherein Game Haven is required to refuse to process an order despite a confirmation order having been sent. In such an event, the Buyer agrees that Game Haven shall not be held liable or in any way be held liable to the Buyer.</p>
            </div>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>3.</span>
                <p>In the event the full payment has been made by the Buyer for its order under a Contract, Game Haven agrees to refund the payment made to the Buyer if the refusal of order is not due to the Buyer’s fault.</p>
            </div>
        </div>

        <dir id="Price">  
            <h2>6. Price</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The price of the Item shall be the price listed on the Platform at the time which the Buyer places and completes the order form on the Platform. The price includes any applicable sales and services tax, value added tax, and/or other taxes (by whatever name called) imposed by the local authorities from time to time, which the Buyer shall be liable to pay to GAME HAVEN in addition to the price, but shall exclude delivery fees (if applicable).</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>For the avoidance of doubt, the price of an Item may be quoted in different currencies depending on the jurisdiction where the Buyer is domiciled or logging in to the Platform.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>In the event that an Item has been mispriced on the Platform, GAME HAVEN shall have the rights to cancel the order or terminate the Contract, in which GAME HAVEN shall inform the Buyer of such cancellation or termination via phone and/or by giving a written notice via email or the communication channel available in the Account. GAME HAVEN’s right to cancel an order or terminate a Contract shall subsist notwithstanding that the Item has been dispatched, or are in transit, or that payment has been charged to the Buyer.</p>
            </div>
        </dir>

        <div id='PaymentTerms'>
            <h2>7. Payment Terms</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>The full purchase price of an Item shall be paid upon checkout. The Buyer will be entitled to make payments for purchase of Item using the various payment methods made available on the Platform.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>A Buyer may pay for the Item in such currency that is available on the Platform in accordance with the prevailing exchange rate determined by GAME HAVEN at its absolute discretion.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>GAME HAVEN shall not be responsible and will not assume liability for any losses and/or damages to the Buyer arising from wrong information and details, including payment information and/or card details, entered by the Buyer or wrong remittance by the Buyer in connection with the payment for purchase of an Item. We reserve all rights to verify whether a Buyer is duly authorised to use a certain payment method, and we may suspend a payment transaction until such authorisation is confirmed or cancel such relevant transaction where such confirmation is not available.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>4.</span>
                <p>Any refund of payment verified and permitted by GAME HAVEN, whether in full or in partial after deducting all payments which a Buyer is liable to pay to us, may take up to thirty (30) days to process. To facilitate the refund process, you shall ensure that the payment information and/or details are accurate, as the default refund method depends on your original payment method.</p>
            </div>
        </div>

        <div id='Warranties'>
            <h2>8. Warranties</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>While GAME HAVEN makes every effort to ensure that all information and descriptions of Items displayed on the Platform are accurate and complete, GAME HAVEN provides the information and descriptions on an ‘as is’, ‘as available’ basis for informational purposes only and does not represent, warrant, or guarantee that an Item’s descriptions are accurate, complete, reliable, current, or error-free. Depictions of an Item are for reference only and may not always accurately depict every aspect of the Item.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>Save as expressly provided in these Terms of Sale, all other warranties, guarantees, conditions, or terms, including those implied by statute or common law, are excluded to the fullest extent permitted by law.</p>
            </div>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>In the event a warranty is attached to an Item, GAME HAVEN will use its commercial reasonable efforts to ensure that such warranty will be honoured in accordance with the warranty’s terms and conditions (if any).</p>
            </div>
        </div>

        <div id='LimitedLiability'>
            <h2>10. Limited Liability and Indemnity</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>In no event shall GAME HAVEN be liable for loss of profit or goodwill, loss of data, loss of production or revenue, or any type of special indirect or consequential loss whatsoever (including loss or damage suffered by the Buyer as a result of an action brought by a third party), even if GAME HAVEN had been advised of the possibility of incurring the same.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>The Buyer shall indemnify and hold harmless GAME HAVEN from and against any claim, demand, proceeding, loss, damage, cost, and expense (including legal costs or solicitor fees) and all liabilities of whatsoever nature or description which may be made or taken, or suffered by GAME HAVEN in connection with or in any manner arising from the breach of any obligation, representation, warranty, or any term of these Terms of Sale by the Buyer or any wrongful act attributable to the Buyer’s agent, officer, representative and/or employee including for infringement of patents, copyrights, trademarks or any other intellectual property and breach of data protection laws.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>Notwithstanding any other provision of these Terms of Sale, GAME HAVEN’s maximum cumulative liability to the Buyer or to any other party for all losses under, arising out of or relating to the sale of Item under each Contract, shall not exceed the sums that the Buyer have paid to GAME HAVEN under such Contract.</p>
            </div> 
        </div>

        <div id='Majeure'>
            <h2>11. Force Majeure</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>GAME HAVEN shall not be liable for any breach, hindrance, or delay in the performance of a Contract, where the cause of such breach, hindrance, or delay is beyond its reasonable control. Such causes may include (but not limited to) an act of God, riot, civil commotion, strike (whether or not involving employees of GAME HAVEN), lockout or other labour disturbance, fire, war, acts of foreign enemies, power outages, pandemics, epidemics, network congestion, telecommunications failure, electrical power failures, or any fault, interruption, disruption, or malfunction of equipment, tools, utilities, communications, computer (software and hardware) services, or networks, government order or change in any law or regulation which renders the performance impractical.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>If GAME HAVEN considers a Force Majeure event to be of such severity or to be continuing for such period of time that it is unable to perform any of its obligations pursuant to this Terms of Sale, GAME HAVEN shall have the absolute discretion to decide on such other alternative arrangement(s), including but not limited to cancelling and terminating the Contract forthwith by written notice and without any liability other than a refund of a non-delivered Item to the Buyer if payment has been duly made to GAME HAVEN.</p>
            </div> 
        </div>

        <div id='Notices'>
            <h2>12. Notices</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>All notices, demands, requests, or other communications to be given or made under these Terms of Use shall be in writing, and shall be sufficiently given or made to the other party by serving such notice at or sending such notice by hand, registered post or electronic mail to the contact details as notified by one party to the other from time-to-time or via the communication channel made available on the Platform.</p>
            </div> 
            
        </div>
        <div id='Notices'>
            <h2>12. Notices</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>All notices, demands, requests, or other communications to be given or made under these Terms of Use shall be in writing, and shall be sufficiently given or made to the other party by serving such notice at or sending such notice by hand, registered post or electronic mail to the contact details as notified by one party to the other from time-to-time or via the communication channel made available on the Platform.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>Notice shall be deemed given:</p>
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
                <p>in the case of email or the communication channel available on the Platform, on the day of transmission, provided that the sender has not received a failed or undeliverable message from the host provider of the recipient within the day of transmission.;</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>4.</span>
                <p>notices placed through any media; or</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>5.</span>
                <p>any manner of notification as GAME HAVEN may, at its absolute discretion, determine.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>Notwithstanding the above and in addition to the above methods of delivery, any notice or document, or communication given by GAME HAVEN to you shall be deemed to be served in the following manner:.</p>
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
                <p>any manner of notification as GAME HAVEN may, at its absolute discretion, determine.</p>
            </div> 
        </div>

        <div id='GeneralProvisions'>
            <h2>13. General Provisions</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>No waiver by GAME HAVEN of any breach or non-compliance of the Contract committed by the Buyer shall be considered as a waiver of any subsequent breach or non-compliance of the same or any other provision. Further, GAME HAVEN’s failure to enforce these Terms of Sale shall not constitute a waiver of the provisions herein contained, and such failure shall not affect the right later to enforce these Terms of Sale. All rights and remedies provided to GAME HAVEN in these Terms of Sale are cumulative and not exclusive of any rights or remedies otherwise provided by law.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>If any provision of these Terms of Sale shall be deemed invalid, unlawful, void, or for any reason unenforceable under the law of any jurisdiction, then that provision shall be deemed severable from these terms and conditions and shall not affect the validity and enforceability of any remaining provisions in such jurisdiction nor the validity and enforceability of the provision in question under the law of any other jurisdiction. In such case, GAME HAVEN shall be entitled to introduce and come out with a substitute provision which is valid and enforceable and achieves to the greatest extent possible the economic, legal and commercial objectives of such illegal, void, invalid, prohibited, or unenforceable term, condition, covenant, or undertaking and the Buyer hereby agrees to accept and be bound by such substitute provision</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>No person who is not a party to the Contract (including any employee, officer, agent, representative or sub-contractor of either party) shall have any right to enforce any terms of the Contract which expressly or by implication confers a benefit on that person.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>4.</span>
                <p>These Terms of Sale shall be governed by and interpreted in accordance with the laws of Trinidad & Tobago without regard to the conflict or choice of law principles. Any dispute, legal action, or proceeding arising out of or in connection with these Terms of Sale shall be submitted to the jurisdiction of the Trinidadian courts, unless GAME HAVEN, in its own discretion, chooses to submit the same for settlement via such other dispute resolution method in Trinidad or otherwise.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>5.</span>
                <p>GAME HAVEN shall be entitled to transfer or assign any of its rights or obligations under these Terms of Sale to a present or future affiliate or pursuant to a merger, consolidation, reorganization, or sale of all or substantially all of the assets or business, or by operation of law, without notice to the Buyer.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>6.</span>
                <p>The terms and conditions set forth in these Terms of Sale and any additional terms and conditions or policies included or referred to in these Terms of Sale constitute the entire agreement and understandings between you and us with respect to the sale and purchase of Items on the Platform.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>7.</span>
                <p>GAME HAVEN RESERVE ALL RIGHTS NOT EXPRESSLY GRANTED HEREIN.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>8.</span>
                <p>These Terms of Sale may be translated into any language(s) other than English (“Translated version”). In the event of any inconsistency between the English version and the Translated version, the English version shall prevail.</p>
            </div> 
        </div>

        <div id='Refund&Return'>
            <h2>REFUND AND RETURN POLICY</h2>
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>1.</span>
                <p>All Items purchased on the Platform are neither refundable nor exchangeable.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>2.</span>
                <p>However, refund or exchange request in exceptional cases will be considered at the sole discretion of GAME HAVEN.</p>
            </div> 
            <div className={styles.indentedWrappers}>
                <span className={styles.indent}>3.</span>
                <p>The Buyer is required to submit a written request to GAME HAVEN on any refund request within seven (7) days from the date of receipt of purchased Item by the Buyer. Failure to do so will automatically forfeit the Buyer's right to make any request for refund or exchange.</p>
            </div> 
        </div>

        <div id='Disclaimers'>
            <h3>Card</h3>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>1.</span>
                <p>Does not include manuals, installation CDs, box, physical card or other physical elements.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>2.</span>
                <p>A Buyer will be able to view his code(s) in his order page after a successful purchase.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>3.</span>
                <p>Refund on pre-order Item may be available at the sole discretion of GAME HAVEN.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>4.</span>
                <p>A successful purchase by a Buyer of any pre-order Item or Item made available for sale on the Platform indicates that all information such Buyer has entered is accurate and correct.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>5.</span>
                <p>Any purchase of pre-order Item are non-refundable, non-transferable, and not exchangeable once sold, unless otherwise agreed in writing by GAME HAVEN.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>6.</span>
                <p>GAME HAVEN reserves the right to amend any of the terms and conditions above without prior notice.</p>
            </div> 
        </div>

        <div id='Direct-TopUp'>
            <h3>Direct Top-Up</h3>
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>1.</span>
                <p>Please read the product description thoroughly and confirm that the game name, server, account name, and the amount purchased are correct.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>2.</span>
                <p>GAME HAVEN assumes no liability for wrong purchases made by the customer due to negligence and/or false or wrong information provided, which may result in damages and losses. By purchasing any Items from GAME HAVEN on the Platform, the Buyer understands, acknowledges and accepts this release of liability.</p>
            </div> 
            <div className={styles.indentedWrappers2}>
                <span className={styles.indent}>3.</span>
                <p>If you encounter any difficulties, please do not hesitate to contact our customer service team for further assistance.</p>
            </div> 
        </div>
        
    </div>
  )
}

export default page