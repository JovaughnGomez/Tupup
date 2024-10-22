/*
  Warnings:

  - The primary key for the `categoryreview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `categoryreview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoryreview` DROP FOREIGN KEY `CategoryReview_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_categoryReviewId_fkey`;

-- AlterTable
ALTER TABLE `categoryreview` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `productcategory` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `review` MODIFY `categoryReviewId` VARCHAR(191) NOT NULL,
    MODIFY `notes` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `CategoryReview` ADD CONSTRAINT `CategoryReview_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_categoryReviewId_fkey` FOREIGN KEY (`categoryReviewId`) REFERENCES `CategoryReview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
