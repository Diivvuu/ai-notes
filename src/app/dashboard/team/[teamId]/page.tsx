"use client";
import { useGetTeam } from "@/features/teams/api/use-get-team";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { AlertTriangleIcon, File, Tag } from "lucide-react";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useCreateFileModal } from "@/store/use-create-file-modal";
import { useTeamId } from "@/hooks/use-team";

function Team() {
  const router = useRouter();
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
      <div className="w-full flex flex-col items-center justify-start mt-20">
        {files?.map((file, index) => {
          return (
            <div
              key={index}
              className="bg-gray-100 hover:bg-gray-200 transition-all ease duration-300 m-2 p-4 rounded-md w-full flex justify-between cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/team/${teamId}/file/${file._id}`)
              }
            >
              <div>{file?.name}</div>
              <div>
                {new Date(file?._creationTime).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Team;
