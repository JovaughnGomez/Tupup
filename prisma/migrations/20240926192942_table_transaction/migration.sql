-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `userBalance` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Transaction_status_idx` ON `Transaction`(`status`);

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `Transaction_userId_fkey` TO `Transaction_userId_idx`;
