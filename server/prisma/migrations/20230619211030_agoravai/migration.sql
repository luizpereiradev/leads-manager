/*
  Warnings:

  - You are about to drop the column `descricao` on the `lead` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `lead` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `lead` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `lead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `lead_mail_key` ON `lead`;

-- AlterTable
ALTER TABLE `lead` DROP COLUMN `descricao`,
    DROP COLUMN `mail`,
    DROP COLUMN `nome`,
    DROP COLUMN `telefone`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lead_email_key` ON `lead`(`email`);
