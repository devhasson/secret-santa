"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { Minus, Plus } from "lucide-react";

import { z } from "zod";

export function AddParticipants() {
  const { data } = useSession();
  const userEmail = data?.user.email;

  const [participants, setParticipants] = useState<{ email: string }[]>([]);
  const [newEmail, setNewEmail] = useState("");

  const handleRemoveParticipant = (email: string) => {
    setParticipants((prev) =>
      prev.filter((participant) => participant.email !== email)
    );
  };

  const handleAddParticipant = (email: string) => {
    if (!email) {
      return toast.error("You must provide an email before adding.");
    }

    if (email === userEmail) {
      return toast.error("You can't invite yourself to the group.");
    }

    try {
      z.string().email().parse(email);
    } catch {
      return toast.error("You must provide a valid email. Please try again.");
    }

    if (participants.some((p) => p.email === email)) {
      return toast.error("Participant is already added.");
    }

    setParticipants((prev) => [...prev, { email }]);
    setNewEmail("");
  };

  return (
    <>
      <Label htmlFor="participant_email">Participants *</Label>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a new participant's email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddParticipant(newEmail);
            }
          }}
        />
        <Button type="button" onClick={() => handleAddParticipant(newEmail)}>
          <Plus />
        </Button>
      </div>

      {participants.map((participant) => (
        <div key={participant.email} className="flex items-center gap-2 mt-2">
          <Input
            name="participant_email"
            readOnly
            className="cursor-not-allowed opacity-50"
            value={participant.email}
          />

          <Button
            type="button"
            variant="ghost"
            onClick={() => handleRemoveParticipant(participant.email)}
          >
            <Minus />
          </Button>
        </div>
      ))}
    </>
  );
}
