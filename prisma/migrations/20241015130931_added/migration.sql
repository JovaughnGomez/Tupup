/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `dateCompleted` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `cardtransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cardtransaction` DROP FOREIGN KEY `CardTransaction_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `cardtransaction` DROP FOREIGN KEY `CardTransaction_userId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `dateCreated`,
    ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `dateCompleted`,
    DROP COLUMN `dateCreated`,
    ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `cardtransaction`;

-- CreateTable
CREATE TABLE `Giftcard` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `denominaton` DECIMAL(65, 30) NOT NULL,
    `isDelivered` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Giftcard` ADD CONSTRAINT `Giftcard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Giftcard` ADD CONSTRAINT `Giftcard_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
