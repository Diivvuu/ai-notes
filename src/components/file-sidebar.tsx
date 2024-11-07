"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ChevronsUpDown, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { useGetTeams } from "@/features/teams/api/use-get-teams";
import { usePathname, useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useFileId } from "@/hooks/use-file";

function FileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const teamId = useTeamId();
  const fileId = useFileId();
  const [open, setOpen] = useCreateTeamModal();
  const { data: files, isLoading: filesLoading } = useGetFiles({ id: teamId });

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="pt-4 pl-2 ">
            <div className="flex items-center justify-between p-1 text-white bg-[#434343] rounded-md">
              <div>Files</div>
              <div onClick={() => setOpen(true)}>
                <PlusIcon className="cursor-pointer size-4" />
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="pl-4">
            {files?.map((file, index) => {
              return (
                <div
                  className={`mt-2 rounded-md cursor-pointer px-2 py-1 ${fileId === file._id ? "bg-[#787878] text-white" : "bg-white"}`}
                  key={index}
                  onClick={() => router.push(`${file._id}`)}
                >
                  {file?.name}
                </div>
              );
            })}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu></SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default FileSidebar;
