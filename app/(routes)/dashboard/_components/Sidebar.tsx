import { useCreateTeamModal } from "@/app/store/use-create-team";
import { Team, User } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { AlertTriangleIcon, ChevronDown, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AppSidebarProps {
  teams: Team[] | null;
}

function AppSidebar() {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const [open, setOpen] = useCreateTeamModal();

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null);

  const getUserId = async () => {
    // console.log("calling get user");
    if (user?.email) {
      const CurrUser = await convex.query(api.user.getUser, {
        email: user.email,
      });
      setCurrUser(CurrUser);
      // console.log(currUser, CurrUser, "current user from layout");
    }
  };
  getUserId();
  const getTeams = async () => {
    console.log(currUser, "hi");
    if (currUser?._id) {
      const result = await convex.query(api.teams.getTeams, {
        id: currUser._id,
      });
      console.log(result);
      setTeams(result);
      return result;
    }
  };
  useEffect(() => {
    getTeams();
    console.log(teams);
  }, [currUser?._id, open, setOpen]);

  // const getTeams = async () => {
  //   if (newUserId) {
  //     const result = await convex.query(api.teams.getTeams, {
  //       id: newUserId,
  //     });
  //     setTeams(result);
  //     if (!result?.length) {
  //       setOpen(true);
  //     } else setOpen(false);
  //     return result;
  //   }
  // };
  console.log(teams);
  return (
    <Sidebar variant="floating">
      <SidebarHeader>Side bar heading</SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          <div className="flex justify-between items-center">
            <div>Teams</div>
            <Plus className="size-4" onClick={() => setOpen(true)} />
          </div>
        </SidebarMenu>
        <SidebarGroupContent>
          <SidebarMenu>
            {teams ? (
              teams.map((team, index) => {
                return (
                  <SidebarMenuItem
                    className="border-b-2 border-t-2"
                    key={index}
                  >
                    {team.name}
                  </SidebarMenuItem>
                );
              })
            ) : (
              <div>
                <div>
                  <AlertTriangleIcon />
                </div>
                <div>Currently you don't have any teams!</div>
              </div>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
