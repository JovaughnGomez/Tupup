import Hero from "@ulixee/hero";
import { CheckIfOrderWasCompleted } from "../controllers/orderController";
import { AppError } from "../lib/AppError";
import { HandlePaypalPayment } from "./paypalUlixee";
import { HandleGeeTestSlideCaptcha, WaitForElement, WaitForOneOfMultiple } from "./directTopUpUtils";
import { ConvertJsonToObject, ExtractPriceFromString, ReadProfileFromPath } from "../lib/utils";

const freefireURL = "https://pagostore.garena.com/";

export async function ProcessFreefireTopup(order)
{
    const paypalProfile = await ReadProfileFromPath("paypal");
    const hero = new Hero({ 
        userProfile: paypalProfile,
        connectionToCore: 'ws://localhost:3003',
        // showChrome: true,
    });
    let successful = false;

    console.log("Beginning the process");
    try {
        const playerData = await ConvertJsonToObject(order.notes);
        const freefireID = playerData.id;
        await hero.goto(freefireURL);
        const loginResults = await HandleFreefireLogin(hero, freefireURL, freefireID);
        if(!loginResults.success)
            throw new AppError(loginResults.message, loginResults.status);
        
        await hero.waitForMillis(3000);
        const captchaResults = await HandleGeeTestSlideCaptcha(hero);

        const logoutButton = await WaitForElement(hero, 'button.ms-auto.flex.items-center');
        if(!logoutButton) 
        {
            if(captchaResults.showedCaptcha)
                throw new AppError("Failed Captcha.", 1001);
            else
                throw new AppError("Failed Login: Likely due to incorrect userID", 1002);
        }
        
        const productCode = await ReturnProductURL(order.product.name);
        const productURL = `https://pagostore.garena.com/buy?app=100067&channel=299043&item=${productCode}`;
        await hero.goto(productURL);

        // Find Price
        const priceElement = await WaitForOneOfMultiple(hero, "dd", 1);
        const priceText = await priceElement.innerText;
        let price = await ExtractPriceFromString(priceText);
        price = parseFloat(price);

        // Click proceed button
        const freefireProceedButton = await WaitForElement(hero, 'button.inline-flex.items-center.justify-center');
        await hero.interact({click: freefireProceedButton}); 

        const boaCompraResults = await HandleBoaCompra(hero);
        if(!boaCompraResults.success)
            throw new AppError(boaCompraResults.message, boaCompraResults.status);

        const paypalResults = await HandlePaypalPayment(hero, price);
        if(!paypalResults.success)
            throw new AppError(paypalResults.message, paypalResults.status);

        successful = true;
    } catch (error) {
        console.log("Error Processing Freefire");
        console.log(error);
    }

    return { success: successful, hero };
}

async function HandleBoaCompra(tab)
{
    const boaCompra_check = await WaitForOneOfMultiple(tab, '.button_next.font_two', 1);
    if(!boaCompra_check)
        throw new AppError("Initial BoaCompra page failed to load...In time?", 404);

    const nextStepButton = await tab.document.querySelectorAll('.button_next.font_two')[1];
    await tab.interact({ move: nextStepButton }, { waitForMillis: 500 }, { clickDown: nextStepButton }, { waitForMillis: 400 }, { clickUp: nextStepButton} );
    
    await nextStepButton.click();
    const secondBoaCompra_check = await WaitForOneOfMultiple(tab, '.button_next.font_two', 1);
    if(secondBoaCompra_check)
    {
        const emailField = await tab.document.getElementById("email_address");
        await tab.interact({ click: emailField }, { type: process.env.TRANSACTION_EMAIL });

        const emailConfirmation = await tab.document.getElementById("email_address_confirmation");
        if(!emailConfirmation)
            throw new AppError("Failed to find the confirm email field.", 204);
        
        await tab.interact({ click: emailConfirmation }, { type: process.env.TRANSACTION_EMAIL });
        
        const completePurchaseButton = await tab.document.querySelectorAll('.button_next.font_two')[1];
        await tab.interact({ move: completePurchaseButton }, { waitForMillis: 500 }, { clickDown: completePurchaseButton }, { waitForMillis: 400 }, { clickUp: completePurchaseButton} );
        await completePurchaseButton.click();
    }
    
    return { success: true }
}

async function HandleFreefireLogin(tab, URL, freefireID)
{
    await tab.goto(URL);
    const idInput = await WaitForElement(tab, 'input[placeholder="Introduce el ID del jugador aquí."]');
    if(!idInput)
        throw new AppError("Failed to find the ID input box.", 500);

    await tab.interact({ click: [100, 540] });
    await tab.interact({ click: idInput }, { type: freefireID });
    
    const loginBtn = await WaitForElement(tab, 'button[type="submit"]');
    if(!loginBtn)
        throw new AppError("Failed to find the login button.", 404);

    await tab.interact({ click: loginBtn });
    return {success: true }
}

async function ReturnProductURL(productName)
{
    switch (productName) {
        case "100 Diamonds":
            return "7011";         
    
        default:
            return "";
    }
}