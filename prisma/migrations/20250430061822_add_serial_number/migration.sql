/*
  Warnings:

  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cuid` on the `Device` table. All the data in the column will be lost.
  - Added the required column `serialNumber` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "serialNumber" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Unnamed Device',
    "dashboardCuid" TEXT NOT NULL,
    CONSTRAINT "Device_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("dashboardCuid", "name") SELECT "dashboardCuid", "name" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
