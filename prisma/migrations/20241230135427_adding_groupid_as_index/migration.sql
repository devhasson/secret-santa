-- DropIndex
DROP INDEX "Participant_userId_groupId_idx";

-- CreateIndex
CREATE INDEX "Participant_userId_idx" ON "Participant"("userId");

-- CreateIndex
CREATE INDEX "Participant_groupId_idx" ON "Participant"("groupId");
