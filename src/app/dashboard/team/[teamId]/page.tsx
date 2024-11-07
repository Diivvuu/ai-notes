"use client";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";
import { useGetTeam } from "@/features/teams/api/use-get-team";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import {
  AlertTriangleIcon,
  Calendar,
  File,
  Link,
  Share,
  Tag,
} from "lucide-react";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useCreateFileModal } from "@/store/use-create-file-modal";
import { useTeamId } from "@/hooks/use-team";
import TeamHeader from "./_components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Team() {
  const router = useRouter();
  const teamId = useTeamId();
  const [open, setOpen] = useCreateFileModal();

  const { data: currentTeam, isLoading: currentTeamLoading } = useGetTeam({
    id: teamId,
  });
  const { data: files, isLoading: filesLoading } = useGetFiles({ id: teamId });

  const formatRelativeDate = (
    creationTime: string | number | Date | undefined
  ): string => {
    if (!creationTime) return "";

    const now = new Date();
    const creationDate = new Date(creationTime);

    // Calculate absolute differences to ensure positive values
    const secondsDifference = Math.abs(differenceInSeconds(now, creationDate));
    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    }

    const minutesDifference = Math.abs(differenceInMinutes(now, creationDate));
    if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    }

    const hoursDifference = Math.abs(differenceInHours(now, creationDate));
    if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    }

    const daysDifference = Math.abs(differenceInDays(now, creationDate));
    if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    }

    const weeksDifference = Math.abs(differenceInWeeks(now, creationDate));
    if (weeksDifference < 4) {
      return `${weeksDifference} weeks ago`;
    }

    const monthsDifference = Math.abs(differenceInMonths(now, creationDate));
    if (monthsDifference < 12) {
      return `${monthsDifference} months ago`;
    }

    const yearsDifference = Math.abs(differenceInYears(now, creationDate));
    return `${yearsDifference} years ago`;
  };

  if (files?.length === 0)
    return (
      <div className="w-full md:mx-12 lg:mx-40  min-h-screen">
        <TeamHeader setOpen={setOpen} name={currentTeam?.name} />

        <div className="w-full flex flex-col items-center justify-center gap-y-4 mt-40">
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
      </div>
    );

  return (
    <div className="w-full md:mx-12 lg:mx-20">
      <TeamHeader setOpen={setOpen} name={currentTeam?.name} />
      <div className="w-full flex flex-col items-center justify-start mt-12">
        <Table className="w-full">
          <TableCaption>List of your teams</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-8">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <div className="flex items-center gap-x-2">
                  Date
                  <Calendar className="size-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-x-2">
                  Shared with
                  <Share className="size-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files?.map((file, index) => (
              <TableRow
                className="cursor-pointer"
                onClick={() => {
                  router.push(`${teamId}/file/${file._id}`);
                }}
                key={index}
              >
                <TableCell className="font-medium pl-8">{index + 1}</TableCell>
                <TableCell className="hover:underline">{file?.name}</TableCell>
                <TableCell>{formatRelativeDate(file._creationTime)}</TableCell>
                <TableCell>{"images + then popup"}</TableCell>
                <TableCell>
                  <Link className="size-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Team;
