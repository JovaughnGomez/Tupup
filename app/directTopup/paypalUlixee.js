import Hero from "@ulixee/hero";
import { AppError } from "../lib/AppError";
import { WaitForElement } from "./directTopUpUtils";
import { ExtractPriceFromString, SaveProfileToPath } from "../lib/utils";

async function HandlePaypalLogin(tab)
{
    try {
        const loggedInCheck = await CheckIfPaypalIsLoggedIn(tab);
        if(!loggedInCheck.isLoggedIn)
        {
            const paypalEmailField = loggedInCheck.paypalEmailField;
            await paypalEmailField.$click();
            const value = await paypalEmailField.getAttribute("value");
            if(value)
            {
                if(value !== process.env.TRANSACTION_EMAIL)
                {
                    await paypalEmailField.removeAttribute("value");
                    await paypalEmailField.$type(process.env.TRANSACTION_EMAIL);
                }
            } else {
                await paypalEmailField.$type(process.env.TRANSACTION_EMAIL);
            }

            const nextButton = await tab.document.getElementById("btnNext");
            if(nextButton)
            {
                await nextButton.$click();
                await tab.interact({ move: nextButton }, { waitForMillis: 500 }, "clickDown", { waitForMillis: 400 }, "clickUp" );
            }
            
            const paypalPasswordField = await WaitForElement(tab, "input[name=login_password]");
            if(!paypalPasswordField)
                throw new AppError("Failed to find the password field.", 204);
            
            await tab.interact({ move: paypalPasswordField }, { waitForMillis: 500 }, "clickDown", { waitForMillis: 400 }, "clickUp" );
            // await paypalPasswordField.$click();
            await paypalPasswordField.$type(process.env.TRANSACTION_PASSWORD);

            const loginButton = await tab.document.getElementById("btnLogin");
            if(!loginButton)
                throw new AppError("Failed to find the login button", 400);
            
            await loginButton.$click();
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

const paypalURL = "https://paypal.com/signin";
export async function LoginPaypalAndCacheProfile() 
{
    try {
        const hero = new Hero({ 
            connectionToCore: 'ws://localhost:3003',
            showChrome: true,
        });

        await hero.goto(paypalURL);
        const loginResults = await HandlePaypalLogin(hero);
        if(!loginResults.success)
            throw new AppError(loginResults.message, loginResults.status);
        
        await SaveProfileToPath("paypal", hero);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function HandlePaypalPayment(tab, expectedCost)
{
    try {
        if(!expectedCost)
            throw new AppError("Expected cost is null or invalid", 400);
        
        const loginResults = await HandlePaypalLogin(tab);
        if(!loginResults.success)
            throw new AppError("Paypal Login Failed", 400);

        const paypalCost = await WaitForElement(tab, ".Cart_cartAmount_4dnoL");
        if(!paypalCost)
            throw new AppError(`Failed to find the final paypal cost`, 404);

        const priceText = await paypalCost.innerHTML;
        const price = await ExtractPriceFromString(priceText);
        if(expectedCost < price)
            throw new AppError(`Cost ${price} but was expected to cost ${expectedCost}.`, 400);
        
        const choosenCard = await WaitForElement(tab, ".FundingInstrument_container_16IeJ");
        if(!choosenCard)
            throw new AppError("Paypal's Choose Card Section was not loaded...In Time?", 404);
        
        const checkoutBtn = await tab.document.getElementById("payment-submit-btn");  
        // await checkoutBtn.$click();   
        return { success: true } 
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function CheckIfPaypalIsLoggedIn(tab)
{
    try {
        const paypalEmailField = await WaitForElement(tab, "input[name=login_email]");
        return { isLoggedIn: paypalEmailField ? false : true, paypalEmailField }
    } catch (error) {
        console.log(error);
        return { isLoggedIn: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 }; 
    }
}