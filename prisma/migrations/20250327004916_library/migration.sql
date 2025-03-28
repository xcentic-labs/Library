-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(10) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isLoggedIn` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
    `createrAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `layoutName` VARCHAR(191) NOT NULL,
    `layoutCols` INTEGER NOT NULL,
    `layoutRows` INTEGER NOT NULL,
    `boxesAt` VARCHAR(500) NULL,

    UNIQUE INDEX `Layout_layoutName_key`(`layoutName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonthlyFee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `fee` INTEGER NOT NULL,
    `layoutId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `isLocker` BOOLEAN NOT NULL,
    `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    `seatNumber` INTEGER NOT NULL,
    `index` INTEGER NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,
    `bookingStartDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bookingEndDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `layoutId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counselling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `benefits` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counsellingsession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL,
    `counsellingId` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `createrAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `permitTo` VARCHAR(191) NOT NULL,
    `priority` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MonthlyFee` ADD CONSTRAINT `MonthlyFee_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `Layout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `Layout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counsellingsession` ADD CONSTRAINT `counsellingsession_counsellingId_fkey` FOREIGN KEY (`counsellingId`) REFERENCES `counselling`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counsellingsession` ADD CONSTRAINT `counsellingsession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
