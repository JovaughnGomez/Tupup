-- AlterTable
ALTER TABLE `transaction` MODIFY `value` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'waiting';
