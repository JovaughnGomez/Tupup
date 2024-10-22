-- DropForeignKey
ALTER TABLE `giftcardprefix` DROP FOREIGN KEY `GiftcardPrefix_id_fkey`;

-- AddForeignKey
ALTER TABLE `GiftcardPrefix` ADD CONSTRAINT `GiftcardPrefix_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductCategory`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
