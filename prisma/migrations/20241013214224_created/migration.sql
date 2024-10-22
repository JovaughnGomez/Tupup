-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
