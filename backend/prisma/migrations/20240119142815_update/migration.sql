/*
  Warnings:

  - Added the required column `caption` to the `PostMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostMedia" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
