import { ProcessWalletTopUp } from "@/app/controllers/transactionController";
import { DoesDenominationExist, GetExclusiveValueOfPhoneCard } from "@/app/services/phoneCardCache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    let transactionId = formData.get('id');
    let vatType = formData.get('vat_type');
    let value = formData.get('value');
    let number = formData.get('number');
    
    if(!transactionId || !vatType || !value || !number)
        return NextResponse.json({ success: false, message: "Some fields were empty" }, { status: 400 });
    
    if(!value)
        return NextResponse.json({ success: false, message: "Value is not a real number" }, { status: 400 });
    
    if(number.length != 7)
        return NextResponse.json({ success: false, message: "Invalid Phone Number" }, { status: 400 });
    
    if(!DoesDenominationExist(value))
        return NextResponse.json({ success: false, message: "Denomination does not exist" }, { status: 400 });
        
    let finalValue = value;
    if(vatType == "inclusive")
    {
        const exclusiveValue = await GetExclusiveValueOfPhoneCard(value);
        if(!exclusiveValue)
            return NextResponse.json({ success: false, message: `There are no phone cards of denomination ($${value})` }, { status: 400 });
        
        finalValue = exclusiveValue;
    } else {
        finalValue = parseInt(value);
    }
    
    const adminNotes = JSON.stringify({ number, vatType });
    const results = await ProcessWalletTopUp(transactionId, finalValue, adminNotes, "completed", new Date());
    if(!results.success)
        return NextResponse.json({ success: false, message: `Unexpected Error` }, { status: 500 });
    
    return NextResponse.json({ success: true, message: `$${finalValue} was added to the user's wallet. Their balance is now: $${results.transaction.balanceAfter}` }, { status: 200 });
}
