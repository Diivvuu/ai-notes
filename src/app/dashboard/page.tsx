"use client";
import { useGetTeams } from "@/features/teams/api/use-get-teams";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = useCreateTeamModal();

  const { data, isLoading } = useGetTeams();

  const teamId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (teamId) router.replace(`/team/${teamId}`);
    else if (!open) setOpen(true);
    else console.log("open create modal");
  }, [teamId, isLoading, open, setOpen]);
  return <div>i am dashbaord</div>;
}

export default Dashboard;
