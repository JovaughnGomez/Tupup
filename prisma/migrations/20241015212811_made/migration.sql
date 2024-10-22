/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Giftcard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Giftcard_code_key` ON `Giftcard`(`code`);
