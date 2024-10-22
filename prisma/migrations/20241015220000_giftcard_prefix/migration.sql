/*
  Warnings:

  - Added the required column `codeLength` to the `GiftcardPrefix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `giftcardprefix` ADD COLUMN `codeLength` INTEGER NOT NULL;
