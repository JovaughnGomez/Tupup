/*
  Warnings:

  - You are about to drop the column `denominaton` on the `giftcard` table. All the data in the column will be lost.
  - Added the required column `denomination` to the `Giftcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `giftcard` DROP COLUMN `denominaton`,
    ADD COLUMN `denomination` INTEGER NOT NULL;
