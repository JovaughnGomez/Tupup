// import Hero from "@ulixee/hero";
import Hero, { KeyboardKey } from "@ulixee/hero";
import { CheckIfOrderWasCompleted } from "../controllers/orderController";
import { AppError } from "../lib/AppError";
import { GetRandomNumber } from "../lib/utils";
import { solveGeeTestCaptcha } from "../services/captcha";
import path from "path";
import { promises as fs } from 'fs';
import assert from "assert";

const freefireID = "9864334269";
const freefireURL = "https://pagostore.garena.com/";
const transactionURL = "https://billing.boacompra.com/checkout.php?payment&sid=f7ddee00ec5208cd40c46b1d2f98e838"

export async function ProcessFreefireTopup(order)
{
    console.log("Order");
    const hero = new Hero({ 
        connectionToCore: 'ws://localhost:3003',
        showChrome: true,
    });

    const { activeTab, document } = hero;
    try {
        const loginResults = await HandleLogin(hero, freefireURL, freefireID);
        if(!loginResults.success)
            return { success: false, message: loginResults.message, status: loginResults.status }
        console.log("Login Resutls");
        console.log(loginResults);

        await hero.waitForMillis(3000);
        const captchaResults = await HandleCaptcha(hero);
        console.log("Captcha Results");
        console.log(captchaResults);

        const logoutButton = await WaitForElement(hero, 'button.ms-auto.flex.items-center');
        if(!logoutButton) 
        {
            if(captchaResults.showedCaptcha)
            {
                throw new AppError("Failed Captcha.", 1001);
            } else {
                throw new AppError("Failed login", 1002);
            }
        }
        
        const productCode = await ReturnProductURL(order.product.name);
        const productURL = `https://pagostore.garena.com/buy?app=100067&channel=299043&item=${productCode}`;
        await hero.goto(productURL);

        // Find Price
        const priceElement = await WaitForOneOfMultiple(hero, "dd", 1);
        const priceText = await priceElement.innerText;
        let price = priceText.match(/\d+\.\d{2}/)[0];
        price = parseFloat(price);
        console.log(`Cost Of Product: ${price}`);
        
        // Click proceed button
        const freefireProceedButton = await WaitForElement(hero, 'button.inline-flex.items-center.justify-center');
        await hero.interact({click: freefireProceedButton}); 
        console.log("Clicked Proceed");

        const boaCompraResults = await HandleBoaCompra(hero);
        console.log("BoaCompra Results");
        console.log(boaCompraResults);

        console.log("Doing Paypal");
        const paypalResults = await HandlePaypal(hero);
        if(!paypalResults.success)
        {
            console.log("Throwing For Paypal");
            throw new AppError(paypalResults.message, paypalResults.status);
        }

        // console.log("Success");
        await Screenshot(hero, "success.jpg");
        // await hero.close();
    } catch (error) {
        console.log(error);
        await Screenshot(hero, "failed.jpg");
        console.log("Failed");
        // await hero.close();
    }
}

async function HandlePaypal(tab)
{
    try {
        const paypalPage = await WaitForElement(tab, ".subHeaderText ");
        if(!paypalPage)
            throw new AppError("Failed to load paypal page");

        const paypalEmailField = await tab.document.getElementById("email");
        if(!paypalEmailField)
            throw new AppError("Failed to find email field", 204);

        await paypalEmailField.$click();
        await paypalEmailField.$type(process.env.TRANSACTION_EMAIL);

        const nextButton = await tab.document.getElementById("btnNext");
        if(nextButton)
        {
            await nextButton.$click();
            await tab.interact({ move: nextButton }, { waitForMillis: 500 }, "clickDown", { waitForMillis: 400 }, "clickUp" );
            const passwordPage = await WaitForElement(tab, "input.pin-password");
            if(!passwordPage)
                throw new AppError("Paypal's Password Section was not displayed...In time?", 404);
        }
        
        const paypalPasswordField = await tab.document.getElementById("password");
        if(!paypalPasswordField)
            throw new AppError("Failed to find the password field.", 204);
        
        
        await paypalPasswordField.$click();
        await paypalPasswordField.$type(process.env.TRANSACTION_PASSWORD);

        const loginButton = await tab.document.getElementById("btnLogin");
        if(!loginButton)
            throw new AppError("Failed to find the login button", 404);
        
        await loginButton.$click();

        const paymentPage = await WaitForElement(tab, ".PayWith_header_3w1y1");
        if(!paymentPage)
            throw new AppError("Paypal's Choose Card Section was not loaded...In Time?", 404);
        
        const chosenCard = await WaitForOneOfMultiple(tab, '.FundingInstrument_container_16IeJ', 1);

        // await tab.interact({ move: chosenCard }, {waitForMillis: 400}, {clickDown: chosenCard}, {waitForMillis: 300}, {clickUp:chosenCard})
        // await chosenCard.$click();
        
        const checkoutBtn = await tab.document.getElementById("payment-submit-btn");  
        await checkoutBtn.$click();       
        return { success: true } 
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function HandleBoaCompra(tab)
{
    try {
        const boaCompra_check = await WaitForOneOfMultiple(tab, '.button_next.font_two', 1);
        if(!boaCompra_check)
            throw new AppError("Initial BoaCompra page failed to load...In time?", 404);
        
        const nextStepButton = await tab.document.querySelectorAll('.button_next.font_two')[1];
        await tab.interact({ move: nextStepButton }, { waitForMillis: 500 }, { clickDown: nextStepButton }, { waitForMillis: 400 }, { clickUp: nextStepButton} );
        console.log("Clicking");
        await nextStepButton.click();
        const secondBoaCompra_check = await WaitForOneOfMultiple(tab, '.button_next.font_two', 1);
        if(secondBoaCompra_check)
        {
            // const url = await hero.url;
            // const isBoaCompra = url.startsWith("https://billing.boacompra.com/");
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
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };     
    }
}

async function HandleCaptcha(tab)
{
    const allFrames = await tab.frameEnvironments;
    const showedCaptcha = allFrames.length > 1;
    if(showedCaptcha)
    {
        const frame =  allFrames[1];
        
        // Finding captcha img
        const canvas = await WaitForElement(frame, 'canvas[width="280"][height="155"][aria-hidden="true"]');
        const img = await canvas.toDataURL();
        if(img.length < 2000)
            throw new AppError("Captcha image not found", 204);
        
        // Solving Captcha Test
        const results = await solveGeeTestCaptcha(img);
        if(!results.success)
            throw new AppError("Did not get a response from 2captcha.", 404);

        const xOffset = parseInt(results.data[0].x);
        const yOffset = parseInt(results.data[0].y);
        const slider = await WaitForElement(frame, 'div.slider');
        const sliderBox = await slider.getBoundingClientRect();
        const init = {
            x: sliderBox.x + sliderBox.width / 2,
            y: sliderBox.y + sliderBox.height / 2
        }
        const target = {
            x: sliderBox.x + sliderBox.width / 2 + xOffset - 15,
            y: yOffset
        } 

        await tab.interact({move: [init.x, init.y]}, { clickDown: [init.x, init.y] }, {move: [target.x, target.y]}, "clickUp" );
        return { success: true, solver: results.solver, showedCaptcha };
    } else {
        return { success: false, showedCaptcha: false};
    }
}

async function HandleLogin(tab, URL, freefireID)
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

async function Screenshot(hero, name)
{
    const screenshot = await hero.takeScreenshot({fullPage: true });
    const filePath = path.join(path.resolve(), name);   
    await fs.writeFile(filePath, screenshot, 'binary');
}

async function WaitForElement(tab, selector)
{
    try {
        const element =  tab.querySelector(selector);
        const foundElement = await tab.waitForElement(element, {
            selector: selector,
            timeoutMs: 10000,
            waitForVisible: true,
        });
        return foundElement;
    } catch (error) {
        return null;        
    }
}

async function WaitForOneOfMultiple(tab, selector, index)
{
    try {
        const element = tab.document.querySelectorAll(selector)[index];
        const foundElement = await tab.waitForElement(element, { 
            selector: selector, 
            timeoutMs: 10000, 
            waitForVisible: true
        });
        return foundElement;
    } catch (error) {
        return null;        
    }
}