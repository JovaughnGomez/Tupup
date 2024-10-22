/*
  Warnings:

  - You are about to drop the column `dateCompleted` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `giftcard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `dateCompleted`,
    DROP COLUMN `paymentId`,
    DROP COLUMN `paymentMethod`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `giftcard`;

-- CreateTable
CREATE TABLE `CardTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `deliveredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardTransaction` ADD CONSTRAINT `CardTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardTransaction` ADD CONSTRAINT `CardTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
