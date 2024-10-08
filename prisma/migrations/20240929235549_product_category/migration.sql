/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productcategory` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `ProductCategory_name_key` ON `ProductCategory`(`name`);

-- CreateIndex
CREATE INDEX `ProductCategory_name_idx` ON `ProductCategory`(`name`);
