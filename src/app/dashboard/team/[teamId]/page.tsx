"use client";
import { useGetTeam } from "@/features/teams/api/use-get-team";
import { useParams } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { AlertTriangleIcon, File, Tag } from "lucide-react";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useCreateFileModal } from "@/store/use-create-file-modal";
import { useTeamId } from "@/hooks/use-team";

function Team() {
  const teamId = useTeamId();
  const [open, setOpen] = useCreateFileModal();

  const { data: currentTeam, isLoading: currentTeamLoading } = useGetTeam({
    id: teamId,
  });
  const { data: files, isLoading: filesLoading } = useGetFiles({ id: teamId });
  if (files?.length === 0)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-y-4">
        <AlertTriangleIcon className="size-8" />
        <div>
          Currently you don't have any files{" "}
          <span
            className="text-sky-500 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Click here to create a new file
          </span>
        </div>
      </div>
    );

  return (
    <div className="w-full md:mx-12 lg:mx-40">
      <div className="flex justify-between items-center  mt-20">
        <h1 className="text-left font-semibold text-lg hover:underline">
          Welcome to #{currentTeam?.name}
        </h1>
        <div>
          <div className="flex items-center justify-center gap-x-2 cursor-pointer">
            <File className="size-5 " onClick={() => setOpen(true)} />
            <Tag className="size-5" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-20"></div>
    </div>
  );
}

export default Team;
