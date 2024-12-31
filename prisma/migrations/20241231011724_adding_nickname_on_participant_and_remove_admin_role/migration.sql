/*
  Warnings:

  - The values [ADMIN] on the enum `ParticipantRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ParticipantRole_new" AS ENUM ('OWNER', 'MEMBER');
ALTER TABLE "Invite" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Participant" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Participant" ALTER COLUMN "role" TYPE "ParticipantRole_new" USING ("role"::text::"ParticipantRole_new");
ALTER TABLE "Invite" ALTER COLUMN "role" TYPE "ParticipantRole_new" USING ("role"::text::"ParticipantRole_new");
ALTER TYPE "ParticipantRole" RENAME TO "ParticipantRole_old";
ALTER TYPE "ParticipantRole_new" RENAME TO "ParticipantRole";
DROP TYPE "ParticipantRole_old";
ALTER TABLE "Invite" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
ALTER TABLE "Participant" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "nickname" TEXT;
