/*
  Warnings:

  - You are about to drop the column `ispb` on the `banks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_banks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "fullName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_banks" ("code", "createdAt", "fullName", "id", "name", "updatedAt") SELECT "code", "createdAt", "fullName", "id", "name", "updatedAt" FROM "banks";
DROP TABLE "banks";
ALTER TABLE "new_banks" RENAME TO "banks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
