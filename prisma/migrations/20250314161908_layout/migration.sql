-- CreateTable
CREATE TABLE `layout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `layoutName` VARCHAR(191) NOT NULL,
    `layoutCols` INTEGER NOT NULL,
    `layoutRows` INTEGER NOT NULL,
    `PricePerMonth` INTEGER NOT NULL,
    `PricePerWeek` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
