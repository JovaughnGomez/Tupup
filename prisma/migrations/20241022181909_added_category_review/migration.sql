-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CategoryReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` VARCHAR(191) NOT NULL,
    `totalExcellent` INTEGER NOT NULL,
    `totalGood` INTEGER NOT NULL,
    `totalDecent` INTEGER NOT NULL,
    `totalBad` INTEGER NOT NULL,
    `totalTerrible` INTEGER NOT NULL,
    `averageScore` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryReviewId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `stars` INTEGER NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryReview` ADD CONSTRAINT `CategoryReview_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_categoryReviewId_fkey` FOREIGN KEY (`categoryReviewId`) REFERENCES `CategoryReview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
