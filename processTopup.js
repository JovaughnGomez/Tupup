"use server"
import Bull from "bull";
import { AppError } from "@/app/lib/AppError";
import { AddAdminNotesToOrder, CheckIfOrderWasCompleted, MarkSingleOrderAsCompleted } from "@/app/controllers/orderController";
import { ProcessFreefireTopup } from "@/app/directTopup/freefireUlixee";
import prisma from "@/server/prisma"
import { CreateDirectoryForOrder, TakeAndSaveOrderScreenshot } from "@/app/lib/utils";

const gameTopupQueue = new Bull('gameTopupQueue', {
    prefix: 'bull_direct-topup',
})

gameTopupQueue.process( async (job, done) => {
    const { order } = job.data;
    const results = await ProcessGameTopupJob(order);
    return { success: true };
});

export async function AddOrderToQueue(order)
{
    try {
        if(!order)
            throw new AppError("Invalid Order.", 400);
        
        gameTopupQueue.add(
            { order },
            { jobId: order.id }
        );

        return { success: true };
    } catch (error) {
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function ProcessGameTopupJob(order)
{
    try {
        const hasOrderBeenCompleted = await CheckIfOrderWasCompleted(order.id);
        if(!hasOrderBeenCompleted.success)
            return { success: false, simpleMessage: hasOrderBeenCompleted.simpleMessage, status: hasOrderBeenCompleted.status }
    
        const serviceName = order.topupName;
        let topupResults;
        switch (serviceName) {
            case "freefire":
                    topupResults = await ProcessFreefireTopup(order);
                break;
            case "bloodstrike":
    
                break;
            case "roblox":
    
                break;
            default:
                return { success: false, simpleMessage: "Failed to find top up service" }
        }

        console.log("Received Results");
        console.log(`Top Up Successful: ${topupResults.success}`);
        let sessionId = "";
        try {
            console.log(`Creating Dir for: ${order.id}`);
            const hero = topupResults.hero;
            sessionId = await hero.sessionId;
            await hero.waitForMillis(3000);
            await CreateDirectoryForOrder(order.id);
            const name = `${sessionId}`;
            await TakeAndSaveOrderScreenshot(hero, order, name);
        } catch (error) { 
            console.log("Failed when trying to save screenshot.");
            console.log(error);
        }
        
        
        if(topupResults.success)
        {
            await MarkSingleOrderAsCompleted(order, prisma);
            console.log(topupResults.sessionId);
            await AddAdminNotesToOrder(order.id, {
                sessionId: sessionId || "",
            })
        }

        return { success: topupResults.success };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}