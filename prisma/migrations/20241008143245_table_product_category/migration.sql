/*
  Warnings:

  - You are about to drop the column `productType` on the `productcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productcategory` DROP COLUMN `productType`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'game-topup';
