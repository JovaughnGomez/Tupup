/*
  Warnings:

  - You are about to alter the column `denominaton` on the `giftcard` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `giftcard` DROP FOREIGN KEY `Giftcard_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `giftcard` DROP FOREIGN KEY `Giftcard_userId_fkey`;

-- AlterTable
ALTER TABLE `giftcard` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `orderId` VARCHAR(191) NULL,
    MODIFY `denominaton` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `GiftcardPrefix` (
    `id` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Giftcard` ADD CONSTRAINT `Giftcard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Giftcard` ADD CONSTRAINT `Giftcard_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftcardPrefix` ADD CONSTRAINT `GiftcardPrefix_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
