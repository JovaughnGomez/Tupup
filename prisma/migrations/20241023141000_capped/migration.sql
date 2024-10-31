/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `salePrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `usdValue` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `value` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `balanceAfter` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `balanceBefore` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `wallet` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `credits` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `salePrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `usdValue` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `value` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `balanceAfter` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `balanceBefore` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` MODIFY `wallet` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `credits` DECIMAL(10, 2) NOT NULL DEFAULT 0;
