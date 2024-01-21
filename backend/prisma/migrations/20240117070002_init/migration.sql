-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30),
    "password" VARCHAR(60) NOT NULL,
    "phone" VARCHAR(10),
    "first_name" VARCHAR(20) NOT NULL,
    "surname" VARCHAR NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "gender" VARCHAR(1) NOT NULL,
    "loginFail" INTEGER,
    "lastLogin" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_audience_type" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
