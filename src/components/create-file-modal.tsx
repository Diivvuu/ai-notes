"use client";
import React, { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useCreateWorkspace } from "../api/use-create-workspaces";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateFileModal } from "@/store/use-create-file-modal";
import { useCreateFile } from "@/features/files/api/use-create-file";
import { useTeamId } from "@/hooks/use-team";

export const CreateFileModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateFileModal();
  const [name, setName] = useState("");
  const teamId = useTeamId();

  const { mutate, isPending } = useCreateFile();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
        teamId,
      },
      {
        onSuccess(Id) {
          toast.success("New file created!");
          router.push(`${teamId}/file/${Id}`);
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="File name e.g. 'XYZ producxt', 'Sales Pitch', 'Landing page'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
