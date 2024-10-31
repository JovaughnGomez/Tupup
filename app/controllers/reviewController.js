import prisma from "@/server/prisma";
import { AppError } from "../lib/AppError";
import { GetSessionFromCookies } from "../lib/session";
import { IsUserAnAdmin } from "./userController";


export async function CreateReviewCategory(category, prismaClient)
{
    try {
        const reviewCategory = await prismaClient.categoryReview.create({
            data: {
                id: category.id,
                productCategory: category
            }
        });
        return { success: true, reviewCategory }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }

}

export async function HideReview(reviewId, status)
{
    try {
        reviewId = parseInt(reviewId);
        if(!reviewId || isNaN(reviewId))
            return AppError("Review not found.", 400, "ReviewID is undefined");
        
        const session = await GetSessionFromCookies();
        const isAdminResults = await IsUserAnAdmin(session);
        if(!isAdminResults.success)
            return { success: false, message: isAdminResults.message };
        
        const review = await prisma.review.findUnique({ 
            where: { id: reviewId } 
        });
        if(!review)
            return AppError("Review not found.", 400, "ReviewID is undefined");
        
        const updatedReview = await prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                show: !review.show,
            }
        });

        return { success: true, status: updatedReview.show };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function CreateReview(categoryId, userId, rating, comment)
{
    if(!categoryId || !userId)
        return { success: false, message: "Unexpected Error", status: 400 };

    if(!comment)
        comment = "";

    comment = comment.trim();

    try {
        rating = parseInt(rating);
        if(!rating || isNaN(rating) || rating <= 0)
            return { success: false, message: "Rating must be greater than 0", status: 400 };

        const review = await prisma.$transaction(async (prismaClient) => {
            
            // Check if category exist.
            const category = await prismaClient.productCategory.findUnique({
                where: {
                    id: categoryId
                }
            });
            
            if(!category || !category.isActive)
                throw new AppError("This product no longer exist", 400, "A request was made to leave a review on a product that is currently set to inactive.");
            
            // Check if player has already left a review.
            const hasPlayerReviewed = await prismaClient.review.findFirst({
                where: {
                    categoryReviewId: categoryId,
                    userId: userId,
                }
            });

            if(hasPlayerReviewed)
                throw new AppError("You've already reviewed this product.", 400);
            
            let reviewCategory = await prismaClient.categoryReview.findUnique({
                where : {
                    id: categoryId
                }
            })

            if(!reviewCategory)
                throw new AppError("", 400, `A request was made to review a ${category.name} which exist but does not have a review column`);

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
                    totalExcellent: {
                        increment: totalExcellent,
                    },
                    totalGood: {
                        increment: totalGood,
                    },
                    totalDecent: {
                        increment: totalDecent,
                    },
                    totalBad: {
                        increment: totalBad,
                    },
                    totalTerrible: {
                        increment: totalTerrible,
                    },
                    totalReviews: {
                        increment: 1,
                    }
                }
            })
            
            if(!categoryReview)
                throw new AppError("This product no longer exist.", 400);

            return review;
        });

        return { success: true, review }
    } catch (error) {
        console.log(error.error || error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error.error || error, status: error.status || 500 };
    }
}

export async function HasUserLeftReviewBefore(userId, categoryReviewId)
{
    try {
        const product = await prisma.order.findFirst({
            where: {
                userId: userId,
                status: "completed",
                product: {
                    categoryId: categoryReviewId,
                },
            },
            include: {
                product: true,
            }
        })

        if(!product)
            return false;

        const review = await prisma.review.findFirst({
            where: {
                userId: userId,
                categoryReviewId: categoryReviewId,
            }
        })

        return !review;
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}