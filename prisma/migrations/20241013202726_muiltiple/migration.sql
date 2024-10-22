-- AlterTable
ALTER TABLE `order` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'waiting';

-- AlterTable
ALTER TABLE `product` ADD COLUMN `inStock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productcategory` ADD COLUMN `inStock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `transaction` MODIFY `method` VARCHAR(191) NULL;
