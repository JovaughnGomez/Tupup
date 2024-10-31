import { promises as fs } from 'fs';
import path from "path";
import { solveGeeTestCaptcha } from "../services/captcha";

export async function Screenshot(hero, name)
{
    const screenshot = await hero.takeScreenshot({fullPage: true });
    const filePath = path.join(path.resolve(), name);   
    await fs.writeFile(filePath, screenshot, 'binary');
}

export async function HandleGeeTestSlideCaptcha(tab)
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

export async function WaitForElement(tab, selector)
{
    try {
        const element =  tab.querySelector(selector);
        const foundElement = await tab.waitForElement(element, {
            selector: selector,
            timeoutMs: 20000,
            waitForVisible: true,
        });
        return foundElement;
    } catch (error) {
        return null;        
    }
}

export async function WaitForOneOfMultiple(tab, selector, index)
{
    try {
        const element = tab.document.querySelectorAll(selector)[index];
        const foundElement = await tab.waitForElement(element, { 
            selector: selector, 
            timeoutMs: 20000, 
            waitForVisible: true
        });
        return foundElement;
    } catch (error) {
        return null;        
    }
}