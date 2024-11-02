"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/Sidebar";
import { JotaiProvider } from "./_components/jotai-provider";
import { Modals } from "./_components/modals";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Team, User } from "@/app/types";
export default function Layout({ children }: { children: React.ReactNode }) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

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
  // const getTeams = async () => {
  //   console.log(currUser, "hi");
  //   if (currUser?._id) {
  //     const result = await convex.query(api.teams.getTeams, {
  //       id: currUser._id,
  //     });
  //     console.log(result);
  //     setTeams(result);
  //     return result;
  //   }
  // };
  // useEffect(() => {
  // getTeams();
  // console.log(teams);
  // }, [currUser?._id]);
  return (
    <JotaiProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {currUser && <Modals user={currUser} />}
          {children}
        </main>
      </SidebarProvider>
    </JotaiProvider>
  );
}
