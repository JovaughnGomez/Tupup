import { NextResponse } from "next/server";
const assert = require('node:assert');
const { chromium, devices } = require('playwright');

// To handle a POST request to /api
export async function POST(request)
{
    console.log("OK");  
    const formData = await request.formData();
    console.log(formData);

    // Setup
    const browser = await chromium.launch();
    const context = await browser.newContext({
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        headless: false,
    });

    const page = await context.newPage();

    // The actual interesting bit
    // await context.route('**/*.{png,jpg,jpeg}', route => route.abort()); // seems to abort loading images\
    await page.goto('https://pagostore.garena.com/app');
    await page.evaluate(() => {
        // localStorage.setItem('ddSession', 'eo90FLr6J0MvHq1m337JLR~YNlNuLurvjUSJJzZnp8m4BfVlSg3RRfubNkGV6KQ9uDmqLbU2D2K93FlZGng0Nj~7M04m3o_EI1Lg8IJOp3tHFj8WDLFC4jbL7sDx4qZQ');
        // Add other local storage items here
      });
    await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
    
    const selectFreefire = await page.$('a._3TqH_GzIKGvl5zE4o8qVY_');
    if(!selectFreefire)
        return NextResponse.json({message: "Failed to find Free Fire"}, {status: 400});
    
    await page.click('a._3TqH_GzIKGvl5zE4o8qVY_');
    
    const selectFreefireId = await page.$('div.CoL3r47acbYtO6eGLcT6G:nth-of-type(5)');
    if(!selectFreefireId)
        return NextResponse.json({message: "Failed to find FreeFire Id Option"}, {status: 400});
    
    await page.click('div.CoL3r47acbYtO6eGLcT6G:nth-of-type(5)');
    await page.fill('input.oxVbmPqVSkCVx79GnnLc7[name="playerId"]', '9864334269');
    await page.click('input._3duKww4d68rWsj1YAVEbYt');
    await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
    
    await page.screenshot({ path: 'captcha.png' });
    let bypassedCaptcha = false;
    try {
        await page.waitForURL('https://pagostore.garena.com/app/100067/buy/0');
        console.log(page.url());    
        bypassedCaptcha = true;
    } catch (error) {
        console.log("Failed when waiting for checkout page");
        await page.screenshot({ path: 'error.png' });
    }
    
    if(!bypassedCaptcha)
        {
            const frame = page.frames()[0];
            const captcha = await frame.$('#ddv1-captcha-container');
            if (captcha) {
                const htmlContent = await captcha.evaluate(el => el.outerHTML);
                console.log(htmlContent); // Print or inspect the HTML content
            }
    } else {
        try {
            await page.click('div._1kSDypsXNWSSqC9_IY5xOU:nth-of-type(2)');
            await page.click('a.qeVolXTT3AXVHe1jJL3lt');
            await page.click('input._3duKww4d68rWsj1YAVEbYt');
            await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 

            const goBtn = page.locator("(//a[@class='button_next font_two'])[2]");
            if (goBtn) 
            {
                goBtn.click();
                await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
            }

            await page.fill('#email_address', 'carenageonline@gmail.com');
            await page.fill('#email_address_confirmation', 'carenageonline@gmail.com');
            const secondGoBtn = page.locator("(//a[@class='button_next font_two'])[2]");
            if (secondGoBtn) {
                secondGoBtn.click();
                await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
            }
            
            await page.fill('input#email', process.env.PEMAIL);
            await page.click('#btnNext');
            await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
            await page.fill('#password', process.env.PPass);
            await page.click('#btnLogin');
            await page.click('#payment-submit-btn');
            await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
            await page.screenshot({ path: 'screenshot.png' });
        } catch (error) {
            console.log(error);
            await page.screenshot({ path: 'error.png' });
        }
    }

    // Teardown
    await context.close();
    await browser.close();
    return NextResponse.json({}, {status: 200});
}
	