/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productcategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `allowMultiple` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `productcategory` DROP PRIMARY KEY,
    ADD COLUMN `allowMultiple` BOOLEAN NOT NULL,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `tags` JSON NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `notes` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `GiftCard` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
