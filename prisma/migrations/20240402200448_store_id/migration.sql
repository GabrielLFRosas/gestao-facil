/*
  Warnings:

  - The primary key for the `user_strore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sotre_id` on the `user_strore` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `user_strore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_strore` DROP FOREIGN KEY `fk_user_store`;

-- AlterTable
ALTER TABLE `user_strore` DROP PRIMARY KEY,
    DROP COLUMN `sotre_id`,
    ADD COLUMN `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`, `store_id`);

-- CreateIndex
CREATE INDEX `fk_user_store_idx` ON `user_strore`(`store_id`);

-- AddForeignKey
ALTER TABLE `user_strore` ADD CONSTRAINT `fk_user_store` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
