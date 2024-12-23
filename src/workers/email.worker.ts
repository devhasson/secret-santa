import { Queue, Worker, Job } from "bullmq";
import { redis } from "@/lib/redis";
import { resend } from "@/lib/resend";
import { InviteUserEmail } from "@/helpers/emails/invite-user";

export const emailQueue = new Queue("email", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

export const emailWorker = new Worker(
  "invite-user",
  async (job: Job) => {
    switch (job.name) {
      case "invite-user":
        const { email, subject, groupName, invitedByEmail, inviteLink } =
          job.data;

        await resend.emails.send({
          from: process.env.EMAIL_FROM as string,
          to: email,
          subject,
          react: InviteUserEmail({ groupName, invitedByEmail, inviteLink }),
        });
        break;
    }
  },
  {
    connection: redis,
    concurrency: 10,
    removeOnComplete: { count: 1000 },
  }
);

emailWorker.on("ready", () => {
  console.log("🚀 Email Worker is ready");
});

emailWorker.on("completed", (job: Job) => {
  console.log(`📧 Email sent to ${job.data.email}`);
});
