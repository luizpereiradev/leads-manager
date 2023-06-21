/*
  Warnings:

  - You are about to drop the column `email` on the `lead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mail]` on the table `lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mail` to the `lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `lead_email_key` ON `lead`;

-- AlterTable
ALTER TABLE `lead` DROP COLUMN `email`,
    ADD COLUMN `mail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lead_mail_key` ON `lead`(`mail`);
