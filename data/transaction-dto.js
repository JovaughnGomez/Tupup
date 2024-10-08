"use server"

import { GetAllPendingTransactionsFromUser, GetTransactionHistory } from "@/app/controllers/transactionController";
import { IsUserAnAdmin, IsUserOrAdmin } from "@/app/controllers/userController";
import { GetSessionFromCookies } from "@/app/lib/session";


class TransactionDTO {
    constructor(transaction)
    {
        this.id = transaction.id,
        this.method = transaction.method,
        this.value = transaction.value.toString(),
        this.status = transaction.status,
        this.notes = JSON.parse(transaction.notes),
        this.adminNotes = transaction.adminNotes ? JSON.parse(transaction.adminNotes) : null,
        this.dateCreated = transaction.dateCreated,
        this.dateCompleted = transaction.dateCompleted,
        this.userId = transaction.userId
        this.balanceBefore = transaction.balanceBefore.toString();
        this.balanceAfter = transaction.balanceAfter.toString();
    }

    ConvertNotesToText()
    {
        switch (this.method) {
            case "phone_card":
                let additionalText = "";
                if(this.adminNotes)
                    additionalText = `Vat: ${this.adminNotes.vatType}`;

                return `VoucherType: ${this.notes.voucherType} <br> Voucher:${this.notes.voucher} <br> ${additionalText}`;                
        
            default:
                return "";
        }
    }

    ConvertAdminNotesToText()
    {
        if(!this.adminNotes)
            return "";
        
        switch (this.method) {
            case "phone_card":
                return `Mobile Number: ${this.adminNotes.number}`;                
        
            default:
                return "";
        }
    }
}

export async function GetAdminTransactionsDTO(transactions)
{
    const session = await GetSessionFromCookies();
    if(!session)
        return null;
    
    const isAdmin = await IsUserAnAdmin(session);
    const allTransactions = [];
    for (let index = 0; index < transactions.length; index++) {
        let transaction = transactions[index];
        transaction = new TransactionDTO(transaction);
        allTransactions.push({
            id: transaction.id,
            method: transaction.method,
            value: transaction.value,
            status: transaction.status,
            notes: transaction.ConvertNotesToText(),
            adminNotes: isAdmin ? transaction.ConvertAdminNotesToText() : "",
            dateCreated: transaction.dateCreated,
            userId: transaction.userId
        }); 
    }

    return allTransactions;
}

export async function GetSingleWalletTransactionUnsafeDTO(transaction)
{
    transaction = new TransactionDTO(transaction);
    return {
        id: transaction.id,
        method: transaction.method,
        status: transaction.status,
        voucherType: transaction.notes.voucherType,
        voucher: transaction.notes.voucher,
        dateCreated: transaction.dateCreated,
    }
}

export async function GetWalletTransactionsDTO(viewer, userId)
{
    const isAuthorized = await IsUserOrAdmin(viewer, userId);
    if(!isAuthorized)
        return null;

    const results = await GetAllPendingTransactionsFromUser(userId);
    if(!results.success)
        return null;

    const transactions = results.transactions;

    const allTransactions = [];
    for (let index = 0; index < transactions.length; index++) {
        let transaction = transactions[index];
        transaction = new TransactionDTO(transaction);
        allTransactions.push({
            id: transaction.id,
            method: transaction.method,
            status: transaction.status,
            voucherType: transaction.notes.voucherType,
            voucher: transaction.notes.voucher,
            dateCreated: transaction.dateCreated,
        }); 
    }

    return allTransactions;
}

export async function GetTransactionHistoryDTO(viewer, userId)
{
    const isAuthorized = await IsUserOrAdmin(viewer, userId);
    if(!isAuthorized)
        return null;

    let results = await GetTransactionHistory(userId);
    if(!results.success)
        return null;

    let transactions = results.transactions;
    
    const allTransactions = [];
    transactions.map((transaction) => {
        transaction = new TransactionDTO(transaction);
        allTransactions.push({
            method: transaction.method,
            status: transaction.status,
            value: transaction.value,
            dateCompleted: transaction.dateCompleted,
            notes: transaction.ConvertNotesToText(),
            vatType: transaction.adminNotes.vatType,
            balanceAfter: transaction.balanceAfter,
        });
    });

    return allTransactions;
}

export default TransactionDTO;