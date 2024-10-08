/*
  Warnings:

  - You are about to drop the column `productId` on the `productcategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ProductCategory_productId_fkey` ON `productcategory`;

-- AlterTable
ALTER TABLE `productcategory` DROP COLUMN `productId`;
