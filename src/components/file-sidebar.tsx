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
import { PlusIcon } from "lucide-react";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { usePathname, useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";
import { useGetFiles } from "@/features/files/api/use-get-files";
import { useFileId } from "@/hooks/use-file";
import { useCreateFileModal } from "@/store/use-create-file-modal";

function FileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const teamId = useTeamId();
  const fileId = useFileId();
  const [open, setOpen] = useCreateFileModal();
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
