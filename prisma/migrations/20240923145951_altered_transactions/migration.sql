/*
  Warnings:

  - You are about to drop the column `numberAssigned` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `vatType` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `voucher` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `voucherType` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `method` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `numberAssigned`,
    DROP COLUMN `vatType`,
    DROP COLUMN `voucher`,
    DROP COLUMN `voucherType`,
    ADD COLUMN `method` VARCHAR(191) NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL;
