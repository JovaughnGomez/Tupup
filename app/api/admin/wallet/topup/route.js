import { ProcessWalletTopUp } from "@/app/controllers/transactionController";
import { DoesDenominationExist, GetExclusiveValueOfPhoneCard } from "@/app/services/phoneCardCache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    let transactionId = formData.get('id');
    let vatType = formData.get('vat_type');
    let value = formData.get('value');
    let number = formData.get('number');
    
    if(!transactionId || !vatType )
        return NextResponse.json({ success: false, message: "Incorrect VatType or TransactionId." }, { status: 400 });
    
    if(!number || number.length != 7)
        return NextResponse.json({ success: false, message: "Invalid number." }, { status: 400 });

    if (!value || isNaN(value) || !DoesDenominationExist(value))
        return NextResponse.json({ success: false, message: "Invalid or non-existent denomination" }, { status: 400 });
        
    const denominationResults = await CalculatePhoneCardValue(vatType, value);
    if(!denominationResults.success)
        return NextResponse.json({ success: false, message: denominationResults.message }, { status: denominationResults.status });
    
    const cardValue = denominationResults.cardValue;

    const adminNotes = JSON.stringify({ number, vatType });
    const results = await ProcessWalletTopUp(transactionId, cardValue, adminNotes, "completed", new Date());
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });
    
    return NextResponse.json({ success: true, message: `$${cardValue} was added to the user's wallet. Their balance is now: $${results.transaction.balanceAfter}` }, { status: 200 });
}

export async function CalculatePhoneCardValue(vatType, denomination)
{
    let cardValue = denomination;
    if(vatType === "inclusive")
    {
        const exclusiveValue = await GetExclusiveValueOfPhoneCard(denomination);
        if(!exclusiveValue)
            return { success: false, message: `There are no phone cards of denomination ($${denomination})`, status: 400 };
        
        cardValue = exclusiveValue;
    } else if(vatType === "exclusive") {
        cardValue = parseInt(denomination);
    } else {
        return { success: false, message: `${vatType} is not a valid Vat Type.`, status: 400};
    }  

    return { success: true, cardValue }
}