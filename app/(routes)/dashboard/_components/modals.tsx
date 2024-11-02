"use client";
import CreateTeamModal from "@/app/_components/create-team-modal";
import { useEffect, useState } from "react";
import { User } from "@/app/types";

interface ModalsProps {
  user: User;
}

export const Modals = ({ user }: ModalsProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {/* <CreateChannelModal /> */}
      <CreateTeamModal user={user} />
    </>
  );
};
