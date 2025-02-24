-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `phonNumber` VARCHAR(10) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
    `createrAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_phonNumber_key`(`phonNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatNumber` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `isLocker` BOOLEAN NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,
    `bookingStartDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bookingEndDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Seat_seatNumber_key`(`seatNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
