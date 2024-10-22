"use client"
import React, { useEffect, useState } from 'react'
import styles from './topup.module.css'
import Image from 'next/image'
import ErrorText from '@/app/components/ErrorText';
import {DoesDenominationExist, GetExclusiveValueOfPhoneCard} from '@/app/services/phoneCardCache'
import { ConvertDateToString } from '@/app/lib/clientUtils';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

function TopUp({userData, allTransactions=[], children}) {
    const serviceFee = process.env.NEXT_PUBLIC_TOPUP_FEE;
    let isVatInclusive = true;
    const [phoneCardType, setPhoneCardType] = useState("bmobile");
    const [showCalculation, setShowCalculation] = useState(false);
    const [vatAmount, setVatAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(false);
    const [transactions, setTransactions] = useState([]);

    let topUpForm;

    useEffect(() => {
        setTransactions(allTransactions);

        // Top-Up Form
        const changeVoucherType = (e) => {
            const voucherInput = document.getElementById("voucherType");
            const topUpBtn = document.getElementById("topupBtn");
            const value = voucherInput.value;
            if(value == "digicel")
            {
                topUpBtn.classList.add("digicel");
                dropdownMenuLabel.classList.add("digicelAlpha")
            } else {
                topUpBtn.classList.remove("digicel");
                dropdownMenuLabel.classList.remove("digicelAlpha")
            }
        };
        const dropdownMenuLabel = document.getElementById("voucherWrp");
        dropdownMenuLabel.addEventListener('change', changeVoucherType);

        // Calculator
        const handleChange = (e) => {
            Calculate();
        };
        const vatDropdown = document.getElementById("vat_type");
        vatDropdown.addEventListener('change', handleChange);
        
        topUpForm = document.getElementById("topup_form");
        const handleSubmit = (e) => {
            e.preventDefault();
            SubmitForm();
        };
        
        topUpForm.addEventListener('submit', handleSubmit);
        // Top Up Submit
        return () => {
            vatDropdown.removeEventListener('change', handleChange);
            dropdownMenuLabel.removeEventListener('change', changeVoucherType);
            topUpForm.removeEventListener('submit', handleSubmit);
        };
    }, []);

    async function SubmitForm()
    {
        const data = new FormData(topUpForm);

        const res = await fetch("/api/wallet/topup", {
            method: "POST",
            body: data,
        });

        const response = await res.json();
        ToggleErrorMessage(response.success, response.message);
        if(res.status == 200)
        {
            if(response.transaction)
                setTransactions((transactions) => [response.transaction, ...transactions]);
        }
    }

    function ToggleErrorMessage(success, message)
    {
        const topUpResponse = document.getElementById('topup_response');
        topUpResponse.classList.remove("hide");
        topUpResponse.innerText = message;
        if(success)
            topUpResponse.classList.add(styles.successful);
        else
            topUpResponse.classList.remove(styles.successful);
    }

    function OnChangeVatType()
    {
        const voucherInput = document.getElementById("voucherType");
        const topUpBtn = document.getElementById("topupBtn");
        const value = voucherInput.value;
        console.log("OK");
        if(value == "digicel")
        {
            topUpBtn.classList.add("digicel");
            dropdownMenuLabel.classList.add("digicelAlpha")
        } else {
            topUpBtn.classList.remove("digicel");
            dropdownMenuLabel.classList.remove("digicelAlpha")
        }
    }

    async function Calculate(e)
    {
        const vatDropdown = document.getElementById("vat_type");
        const vatType = vatDropdown.value;
        isVatInclusive = vatType == "inclusive" ? true : false;

        let valueInput = document.getElementById("calculator_voucher").value;
        
        const isValidInput = DoesDenominationExist(valueInput);
        setError(!isValidInput)

        if(!valueInput || !isValidInput)
        {
            setShowCalculation(false);
            return;
        }
        
        setShowCalculation(true);
        const newBalance = GetExclusiveValueOfPhoneCard(valueInput);
        const valueAsNumber = parseInt(valueInput);

        if(isVatInclusive) { 
            setVatAmount((valueAsNumber - newBalance).toFixed(2));
            setBalance(newBalance - serviceFee);
        } else {
            setVatAmount(0);
            setBalance(valueInput - serviceFee);
        }
    }

    function ToggleVisibility(e)
    {
        const currentTarget = e.currentTarget;

        const trans = currentTarget.querySelector(`.${styles.statsWrp}`);
        trans.classList.toggle(styles.visibility);

        const chevron = currentTarget.querySelector(`.${styles.chevronWrp}`);
        chevron.classList.toggle(styles.chevron);
    }

    return (
        <>
        <h1>My Wallet</h1>
        <div className={styles.contentWrp}>
            <div className={`border ${styles.user_info}`}>
                <div className={styles.title}>
                    <Image 
                        src={"/img/tt_flag.webp"}
                        alt='Flag'
                        width={30}
                        height={10}
                    />
                    <span>Currency (TTD)</span>
                </div>
                <span className={styles.balance}>${userData.wallet} TTD</span>
            </div>  

            <div className={`border ${styles.calculator}`}>
                <div><span className={styles.heading}>Calculator</span></div>
                <span className={styles.calcTip}>Use the calculator to calculate the amount that would be added to your wallet.</span>
                <div className={styles.calculatorInput}>
                    <label className={styles.voucherWrp} tabIndex={0}>
                        <div id='calculatorWrp' className={`${styles.voucherInnerWrp}`}>
                            <select id='vat_type' className={styles.dropdownMenu} name="vat_type" defaultValue="inclusive">
                                <option className={styles.dropdownOption} value="inclusive">Vat Inclusive</option>
                                <option className={styles.dropdownOption} value="exclusive">Vat Exclusive</option>
                            </select>
                            <input id='calculator_voucher' className={styles.topup_input} type="text" placeholder="Voucher Value (e.g 15, 25)" name="calculator_voucher" />
                        </div>
                    </label>
                    <div id='calculator_btn' className={`${styles.calculateBtn}`} onClick={Calculate}>
                        <span>Calculate</span>
                    </div>
                    {error && <ErrorText text={"Voucher not found."}/>}
                </div>
                {showCalculation &&
                    <div id='calculator_stats' className={`${styles.calculator_stats}`}>
                        <div className={styles.statsTitle}>Mobile Provider Fees</div>
                        <div></div>
                        {
                            vatAmount > 0 ? (<div className={styles.statLabel}>Vat(12.5%)</div>)
                            : (<div className={styles.statLabel}>Vat(0%)</div>)
                        }
                        <div id="calculator_vat" className={styles.statValue}>${vatAmount}</div>
                        <div className={styles.statsTitle}>{process.env.NEXT_PUBLIC_WEBSITE_NAME} Fees</div>
                        <div></div>
                        <div className={styles.statLabel}>Service Fee</div>
                        <div id="calculator_localFee" className={styles.statValue}>${serviceFee}</div>
                        <div className={styles.statTotal}>Money added to wallet</div>
                        <div id="calculator_total" className={`${styles.calculator_balance} ${styles.statValue}`}>${balance}</div>
                    </div>
                }
            </div>  
            
            <div className={`border ${styles.user_info}`}>
                <h2 className={styles.heading}> Top-up via Phone Card</h2>
                    {children}
                <p className={`hide ${styles.error}`} id='topup_response'></p>
            </div>  
            
            {transactions.length > 0 &&
            
            <>
            <h2 className={styles.transactionTitle}>Pending Transactions</h2>
            <div className={styles.pendingTransactionsWrp}>
                <div className={styles.tableWrp}>
                    <div className={styles.tableNames}>
                        <div className={styles.row1}>
                            <span className={styles.tableLabel}>Time</span>
                            <span className={styles.tableLabel}>Transaction</span>
                            <span className={styles.tableLabel}>Status</span>
                        </div>
                        <div className={styles.row2 }>
                            <span className={styles.tableLabel}>Type</span>
                            <span className={styles.tableLabel}>Voucher</span>
                        </div>
                    </div>
                </div>
                {transactions.map((transaction, index) =>
                    <div id={transaction.id} className={styles.transactionsWrp} key={transaction.id} onClick={(e) => ToggleVisibility(e)}>   
                        <div className={styles.header}>
                            <div className={styles.dateAt1000px}> 
                                <span>{ConvertDateToString(transaction.createdAt)}</span> 
                            </div>
                            <div>
                                <span>{transaction.method}</span>
                            </div>
                            <div className={styles.headerRight}>
                                <span className={transaction.status == "processing" ? "Processing" : "Completed"}>{transaction.status}</span>
                                <div className={styles.chevronWrp}>
                                    <Icon className={styles.chevron} path={mdiChevronDown} size={1} />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.visibility} ${styles.statsWrp}`}>
                            <div className={`${styles.stats}`}>
                                <div className={styles.statsLabel}>Voucher Type:</div>
                                <div className={styles.statsValue}>{transaction.voucherType}</div>
                                <div className={styles.statsLabel}>Voucher:</div>
                                <div className={styles.statsValue}>{transaction.voucher}</div>
                                <div className={styles.statsLabel}>Date Created:</div>
                                <div className={`${styles.statsDate2} ${styles.statsValue}`}>{ConvertDateToString(transaction.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </>
            }
        </div>
        </>
    )
}

export default TopUp