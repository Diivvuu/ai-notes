"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/Sidebar";
import { useConvex, useQuery } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const convex = useConvex();

  const { user }: any = useKindeBrowserClient();
  // const [fileList, setFileList] = useState();
  const checkTeam = async () => {
    const dbUser = await convex.query(api.user.getUser, { email: user.email });
    if (!dbUser) {
      return;
    }
    const result = await convex.query(api.teams.getTeam, { id: dbUser._id });
    // if email of the user does not have any team then we will redirect to create new
    if (!result) {
      router.push("teams/create");
    }
  };

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
