-- CreateTable
CREATE TABLE `stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `document` VARCHAR(45) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `number` VARCHAR(45) NOT NULL,
    `complement` VARCHAR(45) NULL,
    `city` VARCHAR(255) NOT NULL,
    `primary_color` VARCHAR(45) NOT NULL,
    `secondary_color` VARCHAR(45) NOT NULL,
    `logo` VARCHAR(45) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_strore` (
    `user_id` INTEGER NOT NULL,
    `sotre_id` INTEGER NOT NULL,
    `admin` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL,

    INDEX `fk_user_store_idx`(`sotre_id`),
    PRIMARY KEY (`user_id`, `sotre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(45) NOT NULL,
    `email` VARCHAR(155) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NULL,
    `street` VARCHAR(255) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `number` VARCHAR(45) NOT NULL,
    `complement` VARCHAR(45) NULL,
    `city` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_strore` ADD CONSTRAINT `fk_store_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_strore` ADD CONSTRAINT `fk_user_store` FOREIGN KEY (`sotre_id`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
