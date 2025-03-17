/*
  Warnings:

  - You are about to drop the column `midtransTransactionId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentUrl` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `emailnotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `emailnotification` DROP FOREIGN KEY `EmailNotification_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `midtransTransactionId`,
    DROP COLUMN `paymentUrl`;

-- DropTable
DROP TABLE `emailnotification`;

-- DropTable
DROP TABLE `payment`;
