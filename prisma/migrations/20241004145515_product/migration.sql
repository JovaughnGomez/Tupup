/*
  Warnings:

  - You are about to drop the column `displayName` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `usValue` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `displayName`,
    DROP COLUMN `usValue`,
    ADD COLUMN `usdValue` DECIMAL(65, 30) NOT NULL DEFAULT 0;
