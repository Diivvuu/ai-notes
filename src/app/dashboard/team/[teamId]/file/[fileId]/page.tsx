"use client";
import React from "react";
import dynamic from "next/dynamic";
import "./editor.css";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import { useTeamId } from "@/hooks/use-team";
import { useGetFile } from "@/features/files/api/use-get-file";
import { useFileId } from "@/hooks/use-file";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
const Excalidraw = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

function File() {
  const router = useRouter();
  const teamId = useTeamId();
  const fileId = useFileId();
  const { data: file, isLoading: fileLoading } = useGetFile({ id: fileId });
  console.log(file, "data");
  return (
    <div className="flex flex-col min-h-screen items-start w-full">
      <div className="pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/dashboard/team/${teamId}`);
                }}
              >
                Teams
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer">
                {file?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center h-full w-full">
        <div className="w-6/12 h-full">
          <Editor data={"nice"} onChange={() => {}} holder="editor-holder" />
        </div>

        {/* Excalidraw Canvas */}
        <div className="w-full h-full py-4">
          <Excalidraw />
        </div>
      </div>
    </div>
  );
}

export default File;
