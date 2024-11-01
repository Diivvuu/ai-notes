"use client";
import CreateTeamModal from "@/app/_components/create-team-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {/* <CreateChannelModal /> */}
      <CreateTeamModal />
    </>
  );
};
