"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { usePathname } from "next/navigation";
import FileSidebar from "@/components/file-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isFile = pathname.includes("file");

  return (
    <SidebarProvider>
      {isFile ? <FileSidebar /> : <AppSidebar />}
      {/* <main> */}
      <SidebarTrigger />
      {children}
      {/* </main> */}
    </SidebarProvider>
  );
}
