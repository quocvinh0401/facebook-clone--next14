-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('REACT_POST', 'COMMENT_POST');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('UNSEEN_AND_UNREAD', 'SEEN_AND_UNREAD', 'SEEN_AND_READ');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "data" JSONB NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNSEEN_AND_UNREAD',
    "url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
