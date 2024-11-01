"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/Sidebar";
import { useConvex, useQuery } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useCreateTeamModal } from "@/app/store/use-create-team";
import { JotaiProvider } from "./_components/jotai-provider";
import { Modals } from "./_components/modals";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { useCurrentTeams } from "@/app/hooks/use-current-teams";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const convex = useConvex();
  const [currUser, setCurrUser] = useState(null);

  const [open, setOpen] = useCreateTeamModal();
  const { user }: any = useKindeBrowserClient();

  const { data: currentUser, isLoading: currentUserLoading } = useCurrentUser({
    email: user?.email,
  });
  // const { data: currentTeams, isLoading: currentTeamsLoading } =
  // useCurrentTeams({ id: currentUser?.id });
  useEffect(() => {}, [open, setOpen, currentUser]);
  // useEffect(() => {})
  console.log(currentUser);
  // const [fileList, setFileList] = useState();
  // const checkTeam = async () => {
  //   const dbUser = await convex.query(api.user.getUser, { email: user.email });
  //   if (!dbUser) {
  //     return;
  //   }
  //   const result = await convex.query(api.teams.getTeam, { id: dbUser._id });
  //   // if email of the user does not have any team then we will redirect to create new
  //   if (!result.length) {
  //     console.log(result);
  //     setOpen(true);
  //   }
  // };

  // useEffect(() => {
  //   user && checkTeam();
  // }, [user, setOpen, open]);

  return (
    <JotaiProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Modals />
          {children}
        </main>
      </SidebarProvider>
    </JotaiProvider>
  );
}
