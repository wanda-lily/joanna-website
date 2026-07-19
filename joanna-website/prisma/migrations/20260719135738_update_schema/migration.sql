/*
  Warnings:

  - Added the required column `subtitle` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Section" ADD VALUE 'CURRENT';
ALTER TYPE "Section" ADD VALUE 'TIW';
ALTER TYPE "Section" ADD VALUE 'RECOMMENDATIONS';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostImage" ADD COLUMN     "altText" TEXT;
