"use server"

import Bull from "bull";
import { AppError } from "./app/lib/AppError";
import { CheckIfOrderWasCompleted } from "./app/controllers/orderController";
import { ProcessFreefireTopup } from "./app/directTopup/freefireUlixee";

const gameTopupQueue = new Bull('gameTopupQueue', {
    prefix: 'bull',
})

gameTopupQueue.process( async (job, done) => {

    const { order } = job.data;

    return { success: true };
});

export async function AddOrderToQueue(order)
{
    
    try {
        if(!order.id)
            throw new AppError("Invalid Order: No ID", 400);
        
        order.locked = false;
        // gameTopupQueue.clean(0, "completed");
        // gameTopupQueue.add(
        //     { order },
        //     { jobId: order.id }
        // );
        ProcessGameTopupJob(order);
    } catch (error) {
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function ProcessGameTopupJob(order)
{
    if(order.locked)
        return;
    try {
        const hasOrderBeenCompleted = await CheckIfOrderWasCompleted(order.id);
        if(!hasOrderBeenCompleted.success)
            return { success: false, simpleMessage: hasOrderBeenCompleted.simpleMessage, status: hasOrderBeenCompleted.status }
    
        order.locked = true;
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

        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}