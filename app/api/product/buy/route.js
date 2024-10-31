import { IsCategoryAGiftcard } from "@/app/controllers/categoryController";
import { CreateOrder } from "@/app/controllers/orderController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const productId = formData.get('product_id');
    const quantity = formData.get('quantity');
    const categoryName = formData.get('category_name');

    let notes;
    const isCategoryGiftcard =  await IsCategoryAGiftcard(categoryName);
    if(isCategoryGiftcard.success)
    {
        const formResults = await FilterNotesFromFormData(formData, categoryName);
        if(!formResults.success)
            redirect(`/product/${categoryName}?invalid=${"Please enter valid information."}`);

        notes = formResults.notes;
    }

    const results = await CreateOrder(productId, quantity, session.userId, notes);
    if(!results.success)
        redirect(`/product/${categoryName}`);

    redirect(`/cart/order_checkout?id=${results.order.id}`);
}


async function FilterNotesFromFormData(data, categoryName)
{
    let successful = false;
    const notes = {};
    switch (categoryName) {
        case "freefire":
            const freefireID = data.get("freefire_id");
            notes.id = freefireID;
            console.log(!!freefireID);
            successful = !!freefireID;
        break;
    
        default:
            break;
    }

    let notesAsJson;
    try {
        notesAsJson = JSON.stringify(notes);
    } catch (error) {
        successful = false;
    }

    return { success: successful, notes: notesAsJson };
}