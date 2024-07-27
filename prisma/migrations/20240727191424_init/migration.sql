/*
  Warnings:

  - The `createdAt` column on the `Recruiter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recruiter" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER;
