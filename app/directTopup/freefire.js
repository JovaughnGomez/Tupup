import { chromium, devices } from 'playwright-extra';
import { CheckIfOrderWasCompleted } from "../controllers/orderController";
import { AppError } from "../lib/AppError";
import { GetRandomNumber } from "../lib/utils";
import { solveGeeTestCaptcha } from "../services/captcha";

const stealth = require('puppeteer-extra-plugin-stealth')();
export async function ProcessFreefireTopup(order)
{
    
    console.log("Order");
    // const hasOrderBeenCompleted = await CheckIfOrderWasCompleted(order.id);
    // if(!hasOrderBeenCompleted.success)
    //     return { success: false, simpleMessage: hasOrderBeenCompleted.simpleMessage, status: hasOrderBeenCompleted.status }

    const freefireID = "9864334269";

    // Setup
    const browser = await chromium.launch({
        args: [
            '--enable-webgl',
            '--use-gl=swiftshader',
            '--enable-accelerated-2d-canvas'
        ]
    });
    const context = await browser.newContext({
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        // viewport: { width: 1920, height: 1080 },
        permissions: ['geolocation'],
        viewport: { width: 1280, height: 720 },
        locale: 'en-US',
        timezoneId: 'America/New_York',
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        headless: false,
    });

    const page = await context.newPage();
    await page.evaluate(() => {
        Object.defineProperty(navigator, 'plugins', {
          set: () => [1, 2, 3], // Fake some plugin entries
        });
      });

      await page.evaluate(() => {
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
          // Overwrite the vendor and renderer with generic values
          if (parameter === 37445) return 'Intel Inc.'; // UNMASKED_VENDOR_WEBGL
          if (parameter === 37446) return 'Intel Iris OpenGL Engine'; // UNMASKED_RENDERER_WEBGL
          return getParameter(parameter);
        };
      });
    await page.goto('https://bot.sannysoft.com/');
    await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
    await page.screenshot({ path: 'data.png' });
    
    // await page.goto('https://pagostore.garena.com/');
    await page.waitForLoadState('networkidle'); // Ensure all network requests are finished 
    
    try {
        // await page.mouse.click(100, 540);
        
        // const inputField = page.getByPlaceholder("Introduce el ID del jugador aquí.");
        // await page.waitForTimeout(1000);
        // await inputField.fill(freefireID);

        // await page.waitForTimeout(1000);
        // const loginBtn = await page.waitForSelector('button[type="submit"]');
        // await loginBtn.click();

        // await page.waitForTimeout(2000);
        // const frame = page.frameLocator('iframe[src*="https://geo.captcha-delivery.com/captcha/"]');
        // const canvas = frame.locator('canvas[width="280"][height="155"][aria-hidden="true"]').nth(0);
        
        // const img = await canvas.evaluate(canvas => canvas.toDataURL());
        // if(img.length < 2000)
        //     throw new AppError("Img not found", 400);
        
        // const results = await solveGeeTestCaptcha(img);
        // if(!results.success)
        //     return results;
        
        // const xOffset = parseInt(results.data[0].x);
        // const yOffset = parseInt(results.data[0].y);

        // const slider = frame.locator('div.slider');
        // const sliderBox = await slider.boundingBox();
        // const init = {
        //     x: sliderBox.x + sliderBox.width / 2,
        //     y: sliderBox.y + sliderBox.height / 2
        // }
        
        // const target = {
        //     x: sliderBox.x + sliderBox.width / 2 + xOffset - 15,
        //     y: yOffset
        // }
        // await page.screenshot({ path: 'logged0.png' });
        
        // const randomInt = await GetRandomNumber(50, 100);

        // await page.mouse.move(init.x, init.y);
        // await page.mouse.down();
        // await page.mouse.move(target.x, target.y, {
        //     steps: randomInt
        // })
        // await page.mouse.up();
        // await page.waitForTimeout(2000);
        
        // await page.screenshot({ path: 'logged.png' });
        
        
        // const productCode = await ReturnProductURL(order.product.name);
        // console.log(productCode);

        // // await page.goto(`https://pagostore.garena.com/buy?app=100067&channel=299043&item=${productCode}`);
        // await page.waitForLoadState('networkidle'); // Enusre all network requests are finished 
        
        // await page.screenshot({ path: 'success.png' });
        
        // const priceText = await page.getByText('US $')
        // if(!priceText)
        //     console.log("Price text was not found");

        // const innerText = await priceText.innerText();
        // let price = innerText.match(/\d+\.\d{2}/)[0];
        // price = parseFloat(price);
        // console.log(`Is price equal: ${price == order.product.usdValue}`);
        console.log("Success");
        await context.close();
        await browser.close();
    } catch (error) {
        console.log("Failed");
        await page.screenshot({ path: 'screen.png' });
        await context.close();
        await browser.close();
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
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