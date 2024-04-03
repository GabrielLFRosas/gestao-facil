/*
  Warnings:

  - You are about to drop the column `created_at` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stores` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;
