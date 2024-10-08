-- DropForeignKey
ALTER TABLE `productcategory` DROP FOREIGN KEY `ProductCategory_productId_fkey`;

-- AlterTable
ALTER TABLE `productcategory` MODIFY `region` VARCHAR(191) NULL,
    MODIFY `guide` VARCHAR(191) NULL,
    MODIFY `allowMultiple` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `tags` JSON NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_fkey` FOREIGN KEY (`category`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
