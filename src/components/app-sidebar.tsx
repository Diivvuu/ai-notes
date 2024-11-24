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
import { ChevronsUpDown, Pencil, PlusIcon, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { useGetTeams } from "@/features/teams/api/use-get-teams";
import { usePathname, useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useFileId } from "@/hooks/use-file";

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const teamId = useTeamId();
  const fileId = useFileId();
  const [open, setOpen] = useCreateTeamModal();
  const { data: teams, isLoading: teamsLoading } = useGetTeams();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="pt-4 pl-2 ">
            <div className="flex items-center justify-between p-1 text-white bg-[#434343] rounded-md">
              <div>Teams</div>
              <div onClick={() => setOpen(true)}>
                <PlusIcon className="cursor-pointer size-4" />
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="pl-4">
            {teams?.map((team, index) => {
              return (
                <div
                  className={`flex justify-between items-center mt-2 rounded-md cursor-pointer px-2 py-1 ${teamId === team._id ? "bg-[#787878] text-white" : "bg-white"}`}
                  key={index}
                  onClick={() => router.push(`${team._id}`)}
                >
                  {team?.name}
                  <div className="flex items-center gap-2">
                    <Pencil
                      className={`size-3.5 ${teamId === team._id ? " text-white" : "text-black"} hover:scale-110 transition-all ease duration-100`}
                    />
                    <Trash
                      className={`size-3.5 ${teamId === team._id ? " text-white" : "text-black"} hover:scale-110 transition-all ease duration-100`}
                    />
                  </div>
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

export default AppSidebar;
