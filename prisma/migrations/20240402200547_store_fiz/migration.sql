/*
  Warnings:

  - You are about to drop the `user_strore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_strore` DROP FOREIGN KEY `fk_store_user`;

-- DropForeignKey
ALTER TABLE `user_strore` DROP FOREIGN KEY `fk_user_store`;

-- DropTable
DROP TABLE `user_strore`;

-- CreateTable
CREATE TABLE `user_store` (
    `user_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `admin` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL,

    INDEX `fk_user_store_idx`(`store_id`),
    PRIMARY KEY (`user_id`, `store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_store` ADD CONSTRAINT `fk_store_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_store` ADD CONSTRAINT `fk_user_store` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
