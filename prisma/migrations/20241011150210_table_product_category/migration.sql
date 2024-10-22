/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `onSale` on the `productcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `onSale` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productcategory` DROP COLUMN `onSale`;
