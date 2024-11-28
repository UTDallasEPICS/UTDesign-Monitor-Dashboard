-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slide" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL DEFAULT 1,
    "image" TEXT NOT NULL DEFAULT '',
    "video" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "dashboardCuid" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 10,
    CONSTRAINT "Slide_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Slide" ("cuid", "dashboardCuid", "duration", "image", "index", "video", "website") SELECT "cuid", "dashboardCuid", "duration", "image", "index", "video", "website" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
