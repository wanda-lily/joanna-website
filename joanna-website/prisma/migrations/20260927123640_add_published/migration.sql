-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT,
    "country" TEXT,
    "countryCode" TEXT,
    "latitude" REAL,
    "longitude" REAL
);
INSERT INTO "new_Post" ("body", "city", "country", "countryCode", "createdAt", "id", "latitude", "longitude", "published", "section", "slug", "subtitle", "title") SELECT "body", "city", "country", "countryCode", "createdAt", "id", "latitude", "longitude", "published", "section", "slug", "subtitle", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
