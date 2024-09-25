-- CreateTable
CREATE TABLE "User" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "user_role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "userCuid" TEXT NOT NULL,
    CONSTRAINT "Dashboard_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Slide" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '',
    "video" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "dashboardCuid" TEXT NOT NULL,
    CONSTRAINT "Slide_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Device" (
    "cuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Unnamed Device',
    "dashboardCuid" TEXT NOT NULL,
    CONSTRAINT "Device_dashboardCuid_fkey" FOREIGN KEY ("dashboardCuid") REFERENCES "Dashboard" ("cuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
