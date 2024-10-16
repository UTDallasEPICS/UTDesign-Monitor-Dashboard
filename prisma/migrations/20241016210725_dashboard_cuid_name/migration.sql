/*
  Warnings:

  - The primary key for the `Dashboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cuid` on the `Dashboard` table. All the data in the column will be lost.
  - The required column `dash_cuid` was added to the `Dashboard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dashboard" (
    "dash_cuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "userCuid" TEXT NOT NULL,
    CONSTRAINT "Dashboard_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dashboard" ("name", "userCuid") SELECT "name", "userCuid" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
CREATE TABLE "new_Device" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Unnamed Device',
    "dashboardCuid" TEXT NOT NULL,
    CONSTRAINT "Device_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("dash_cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("cuid", "dashboardCuid", "name") SELECT "cuid", "dashboardCuid", "name" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE TABLE "new_Slide" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '',
    "video" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "dashboardCuid" TEXT NOT NULL,
    CONSTRAINT "Slide_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("dash_cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Slide" ("cuid", "dashboardCuid", "image", "index", "video", "website") SELECT "cuid", "dashboardCuid", "image", "index", "video", "website" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
