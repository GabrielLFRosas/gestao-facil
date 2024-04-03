/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zip` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stores` ADD COLUMN `zip` VARCHAR(255) NOT NULL,
    MODIFY `primary_color` VARCHAR(45) NULL DEFAULT '#000',
    MODIFY `secondary_color` VARCHAR(45) NULL DEFAULT '#FFF',
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isAdmin` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `zip` VARCHAR(255) NOT NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `user-store` (
    `userId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `admin` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL DEFAULT 0,

    INDEX `fk_store_idx`(`storeId`),
    PRIMARY KEY (`userId`, `storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `document_UNIQUE` ON `users`(`document`);

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `user-store` ADD CONSTRAINT `fk_store` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user-store` ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
