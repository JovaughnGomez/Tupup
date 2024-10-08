/*
  Warnings:

  - You are about to drop the column `amountAvailable` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `product` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usValue` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `amountAvailable`,
    DROP COLUMN `region`,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    ADD COLUMN `usValue` DECIMAL(65, 30) NOT NULL;
