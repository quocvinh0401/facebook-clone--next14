/*
  Warnings:

  - You are about to drop the column `isLike` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostLike` table. All the data in the column will be lost.
  - Added the required column `is_like` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `PostLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- AlterTable
ALTER TABLE "PostLike" DROP COLUMN "isLike",
DROP COLUMN "postId",
ADD COLUMN     "is_like" BOOLEAN NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
