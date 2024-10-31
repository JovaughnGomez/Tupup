/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `salePrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `usdValue` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `value` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `balanceAfter` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `balanceBefore` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `wallet` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `credits` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `salePrice` DOUBLE NOT NULL,
    MODIFY `usdValue` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transaction` MODIFY `value` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `balanceAfter` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `balanceBefore` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` MODIFY `wallet` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `credits` DOUBLE NOT NULL DEFAULT 0;
