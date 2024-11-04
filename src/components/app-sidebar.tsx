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
import { useState } from "react";
import { ChevronsUpDown, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { useGetTeams } from "@/features/teams/api/use-get-teams";
import { usePathname, useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isFile = pathname.includes("file");
  const [open, setOpen] = useCreateTeamModal();
  const { data, isLoading } = useGetTeams();
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="pt-4 pl-2 ">
            {!isFile ? (
              <div className="flex items-center justify-between p-1 bg-gray-200 rounded-md">
                <div>Teams</div>
                <div onClick={() => setOpen(true)}>
                  <PlusIcon className="cursor-pointer size-4" />
                </div>
              </div>
            ) : (
              <div>File</div>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem className="pl-4">
            {data?.map((team, index) => {
              return (
                <div
                  className="mt-2 bg-gray-100 rounded-md cursor-pointer"
                  key={index}
                  onClick={() => router.push(`${team._id}`)}
                >
                  {team?.name}
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
