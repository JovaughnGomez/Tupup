/*
  Warnings:

  - You are about to drop the column `type` on the `productcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productcategory` DROP COLUMN `type`,
    ADD COLUMN `productType` VARCHAR(191) NOT NULL DEFAULT 'game-topup';
