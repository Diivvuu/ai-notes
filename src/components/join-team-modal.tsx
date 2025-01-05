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
import { useCreateTeam } from "@/features/teams/api/use-create-teams";
import { useJoinTeamModal } from "@/store/use-join-team";
import { useTeamId } from "@/hooks/use-team";
import { useGetTeam } from "@/features/teams/api/use-get-team";

export const JoinTeamModal = () => {
  const router = useRouter();
  const [open, setOpen] = useJoinTeamModal();
  const teamId = useTeamId();

  const { data: currentTeam } = useGetTeam({ id: teamId });

  const { mutate, isPending } = useCreateTeam();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite more members in {currentTeam?.name}?</DialogTitle>
        </DialogHeader>
        <div>{currentTeam?.joinCode}</div>
        <div>copy this code and send to your friend</div>
        <div className="flex items-center justify-center">
          <div>whatsapp</div>
          <div>whatsapp</div>
          <div>whatsapp</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
