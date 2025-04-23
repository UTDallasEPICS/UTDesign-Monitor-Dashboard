/*
  Warnings:

  - You are about to drop the column `image` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Slide` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slide" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL DEFAULT 1,
    "url" TEXT NOT NULL DEFAULT '',
    "dashboardCuid" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 10,
    "type" TEXT NOT NULL DEFAULT 'image',
    CONSTRAINT "Slide_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Slide" ("cuid", "dashboardCuid", "duration", "index", "type") SELECT "cuid", "dashboardCuid", "duration", "index", "type" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
