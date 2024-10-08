/*
  Warnings:

  - You are about to drop the column `userBalance` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `userBalance`,
    ADD COLUMN `balanceAfter` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    ADD COLUMN `balanceBefore` DECIMAL(65, 30) NOT NULL DEFAULT 0;
