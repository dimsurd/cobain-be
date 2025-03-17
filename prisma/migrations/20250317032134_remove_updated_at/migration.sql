/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `updatedAt`;
