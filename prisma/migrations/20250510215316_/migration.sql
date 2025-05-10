/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `otp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `otp_email_key` ON `otp`(`email`);
