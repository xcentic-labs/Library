/*
  Warnings:

  - You are about to drop the column `benifits` on the `counselling` table. All the data in the column will be lost.
  - Added the required column `benefits` to the `counselling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `counselling` DROP COLUMN `benifits`,
    ADD COLUMN `benefits` VARCHAR(191) NOT NULL;
