-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dashboard" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "preview" TEXT NOT NULL DEFAULT '',
    "userCuid" TEXT NOT NULL,
    CONSTRAINT "Dashboard_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dashboard" ("cuid", "name", "userCuid") SELECT "cuid", "name", "userCuid" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
