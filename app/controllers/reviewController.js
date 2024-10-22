import prisma from "@/server/prisma";
import { AppError } from "../lib/AppError";


export async function CreateReviewCategory(categoryId, prismaClient)
{
    try {
        const reviewCategory = await prismaClient.categoryReview.create({
            data: {
                categoryId
            }
        });
        return { success: true, reviewCategory }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }

}

export async function CreateReview(categoryId, userId, rating, comment)
{
    if(!categoryId || !userId)
        return { success: false, message: "Unexpected Error", status: 400 };

    if(!rating)
        return { success: false, message: `One or more fields were null. CatId:${categoryId}, UserId:${userId}, Rating:${rating}, Comment:${comment}.` };
    
    if(!comment)
        comment = "";

    try {
        rating = parseInt(rating);
        if(isNaN(rating) || rating <= 0)
            return { success: false, message: `Rating is invalid.`, status: 400 };

        const review = await prisma.$transaction(async (prismaClient) => {
            // Check if category exist.
            const category = await prismaClient.productCategory.findUnique({
                where: {
                    id: categoryId
                }
            });
            
            if(!category || !category.isActive)
                throw new AppError("This category does not exist");
            
            // Check if player has already left a review.
            const hasPlayerReviewed = await prismaClient.review.findFirst({
                where: {
                    categoryReviewId: categoryId,
                    userId: userId,
                }
            });

            if(hasPlayerReviewed)
                throw new AppError("You've already reviewed this product.");
            
            // Creating Review
            const review = await prismaClient.review.create({
                data: {
                    categoryReviewId: categoryId,
                    userId,
                    stars: rating,
                    notes: comment,
                }
            });
            
            const totalExcellent = rating == 5 ? 1 : 0;
            const totalGood = rating == 4 ? 1 : 0;
            const totalDecent = rating == 3 ? 1 : 0;
            const totalBad = rating == 2 ? 1 : 0;
            const totalTerrible = rating == 1 ? 1 : 0;

            const categoryReview = await prismaClient.categoryReview.update({
                where: {
                    id: categoryId
                },
                data: {
                    totalExcellent,
                    totalGood,
                    totalDecent,
                    totalBad,
                    totalTerrible,
                }
            })
            
            if(!categoryReview)
                throw new AppError("This product no longer exist.", 400);

            return review;
        });

        return { success: true, review }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}