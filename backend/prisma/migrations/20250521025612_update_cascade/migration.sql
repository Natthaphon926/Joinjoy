-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_activityID_fkey`;

-- DropForeignKey
ALTER TABLE `participation` DROP FOREIGN KEY `Participation_activityID_fkey`;

-- DropIndex
DROP INDEX `Image_activityID_fkey` ON `image`;

-- DropIndex
DROP INDEX `Participation_activityID_fkey` ON `participation`;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_activityID_fkey` FOREIGN KEY (`activityID`) REFERENCES `Activity`(`activityID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_activityID_fkey` FOREIGN KEY (`activityID`) REFERENCES `Activity`(`activityID`) ON DELETE CASCADE ON UPDATE CASCADE;
