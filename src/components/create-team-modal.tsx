"use client";
import React, { useState } from "react";

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

export const CreateTeamModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateTeamModal();
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new team</DialogTitle>
        </DialogHeader>
        <form onSubmit={() => {}} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'UX/UI designers', 'Frontend Developers'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
