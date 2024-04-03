/*
  Warnings:

  - You are about to drop the `user_store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_store` DROP FOREIGN KEY `fk_store_user`;

-- DropForeignKey
ALTER TABLE `user_store` DROP FOREIGN KEY `fk_user_store`;

-- DropTable
DROP TABLE `user_store`;
