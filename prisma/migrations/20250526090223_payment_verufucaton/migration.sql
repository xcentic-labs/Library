-- CreateTable
CREATE TABLE `paymentverification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tnx_id` VARCHAR(191) NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `paymentverification_tnx_id_key`(`tnx_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
