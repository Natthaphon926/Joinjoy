/*
  Warnings:

  - You are about to drop the column `healthConditions` on the `participation` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `participation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `status` ENUM('ACTIVE', 'EXPIRED') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `participation` DROP COLUMN `healthConditions`,
    DROP COLUMN `phoneNumber`,
    MODIFY `whyParticipate` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `healthConditions` VARCHAR(191) NULL DEFAULT 'none',
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL DEFAULT 'unknown';

-- CreateTable
CREATE TABLE `Tree` (
    `treeID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `carbonAbsorption` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`treeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParticipationTree` (
    `participationID` INTEGER NOT NULL,
    `treeID` INTEGER NOT NULL,

    PRIMARY KEY (`participationID`, `treeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParticipationTree` ADD CONSTRAINT `ParticipationTree_participationID_fkey` FOREIGN KEY (`participationID`) REFERENCES `Participation`(`participationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipationTree` ADD CONSTRAINT `ParticipationTree_treeID_fkey` FOREIGN KEY (`treeID`) REFERENCES `Tree`(`treeID`) ON DELETE RESTRICT ON UPDATE CASCADE;
