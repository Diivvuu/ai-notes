"use client";
import { useEffect, useState } from "react";
import { CreateTeamModal } from "./create-team-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {/* <CreateChannelModal /> */}
      {/* <CreateWorkSpaceModal /> */}
      <CreateTeamModal />
    </>
  );
};
