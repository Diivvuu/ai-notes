"use client";
import React, { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateTeamModal } from "../store/use-create-team-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useCreateWorkspace } from "../api/use-create-workspaces";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateTeam } from "@/features/teams/api/use-create-teams";

export const CreateTeamModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateTeamModal();
  const [name, setName] = useState("");

  const { mutate, isPending } = useCreateTeam();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        name,
      },
      {
        onSuccess(Id) {
          toast.success("Team created!");
          router.push(`/dashboard/team/${Id}`);
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Team name e.g. 'UX/UI designers', 'Frontend Developers'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
