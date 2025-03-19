/*
  Warnings:

  - Added the required column `priority` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` ADD COLUMN `priority` VARCHAR(191) NOT NULL;
