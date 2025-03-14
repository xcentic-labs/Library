/*
  Warnings:

  - You are about to drop the `layout` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Seat` ADD COLUMN `layoutId` INTEGER NULL;

-- DropTable
DROP TABLE `layout`;

-- CreateTable
CREATE TABLE `Layout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `layoutName` VARCHAR(191) NOT NULL,
    `layoutCols` INTEGER NOT NULL,
    `layoutRows` INTEGER NOT NULL,
    `pricePerMonth` INTEGER NOT NULL,
    `pricePerWeek` INTEGER NOT NULL,

    UNIQUE INDEX `Layout_layoutName_key`(`layoutName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `Layout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
