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
import { useEffect, useRef, useState } from "react";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { useGetTeams } from "@/features/teams/api/use-get-teams";
import { usePathname, useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";
import { useFileId } from "@/hooks/use-file";
import { useUpdateTeam } from "@/features/teams/api/use-update-team";
import { Input } from "./ui/input";
import { Id } from "../../convex/_generated/dataModel";
import { Loader, Pencil, PlusIcon, Trash } from "lucide-react";
import { useRemoveTeam } from "@/features/teams/api/use-remove-team";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const teamId = useTeamId();
  const fileId = useFileId();
  const editRef = useRef<HTMLInputElement | null>(null);

  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Team",
    "Are you sure you want to remove this team?"
  );

  //getting teams
  const { data: teams, isLoading: teamsLoading } = useGetTeams();

  const [open, setOpen] = useCreateTeamModal();
  const [teamEditing, setTeamEditing] = useState<Id<"teams"> | null>(null);
  const [newName, setNewName] = useState("");
  //rename team
  const { mutate: updateTeam, isPending: isUpdatingTeam } = useUpdateTeam();
  //remove team
  const { mutate: removeTeam, isPending: isRemovingTeam } = useRemoveTeam();

  const handleRemove = async (teamId: Id<"teams">) => {
    const ok = await confirm();
    if (!ok) return;
    removeTeam(
      { id: teamId },
      {
        onSuccess: () => {
          toast.success("Team successfully removed");
        },
      }
    );
  };
  //rename team
  const handleEdit = (teamId: Id<"teams">, currentName: string) => {
    setTeamEditing(teamId);
    setNewName(currentName);

    setTimeout(() => {
      editRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editRef.current &&
        !editRef.current.contains(event.target as Node) &&
        teamEditing
      ) {
        saveEditedTeam();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [teamEditing, newName, teams]);

  const saveEditedTeam = () => {
    if (
      newName &&
      teams?.find((team) => team._id === teamEditing)?.name !== newName
    ) {
      teamEditing !== null &&
        updateTeam(
          { id: teamEditing, name: newName },
          {
            onSuccess: () => {
              console.log("Team renamed successfully");
            },
            onError: (error) => {
              console.error("Error renaming team:", error);
            },
          }
        );
    }
    setTeamEditing(null);
    setNewName("");
  };

  return (
    <Sidebar variant="floating">
      {teamsLoading ? (
        <Loader className="animate-spin size-6 m-auto" />
      ) : (
        <>
          <ConfirmDialog />
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="pt-4 pl-2">
                <div className="flex items-center justify-between p-1 text-white bg-[#434343] rounded-md">
                  <div>Teams</div>
                  <div onClick={() => setOpen(true)}>
                    <PlusIcon className="cursor-pointer size-4" />
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="pl-4">
                {teams?.map((team, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center mt-2 rounded-md cursor-pointer pl-1 pr-2 py-1 ${
                      teamId === team._id
                        ? "bg-[#787878] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => router.push(`${team._id}`)}
                  >
                    {teamEditing === team._id ? (
                      <Input
                        ref={editRef}
                        className="h-fit w-32 border-2 pl-1 pr-0 border-white outline-2 outline-white"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEditedTeam();
                          }
                        }}
                      />
                    ) : (
                      team?.name
                    )}
                    <div className="flex items-center gap-2">
                      <Pencil
                        className={`size-3.5 ${
                          teamId === team._id ? "text-white" : "text-black"
                        } hover:scale-110 transition-all ease duration-100`}
                        onClick={() => {
                          handleEdit(team._id, team.name);
                        }}
                      />
                      <Trash
                        className={`size-3.5 ${
                          teamId === team._id ? "text-white" : "text-black"
                        } hover:scale-110 transition-all ease duration-100`}
                        onClick={() => handleRemove(team._id)}
                      />
                    </div>
                  </div>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter>
            <AppSidebarFooter />
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}

export default AppSidebar;
