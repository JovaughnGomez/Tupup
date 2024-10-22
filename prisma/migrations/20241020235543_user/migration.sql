/*
  Warnings:

  - A unique constraint covering the columns `[baseEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `baseEmail` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_baseEmail_key` ON `User`(`baseEmail`);
