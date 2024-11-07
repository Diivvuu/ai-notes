"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";

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
  const [triggerSave, setTriggerSave] = useState(false);

  const { data: file, isLoading: fileLoading } = useGetFile({ id: fileId });
  console.log(file, "data");
  return (
    file && (
      <div className="flex flex-col min-h-screen items-start w-full">
        <div className="flex items-center justify-between w-full pt-8 pr-2.5">
          <div>
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
          <div>
            <Button>Save</Button>
          </div>
        </div>
        <div className="flex justify-start items-center h-full w-full">
          <div className="w-6/12 h-[95%]">
            <Editor
              data={file?.document}
              onChange={() => {}}
              holder="editor-holder"
              onSaveTrigger={() => {}}
            />
          </div>

          <div className="w-full h-[95%] pt-4 mr-2 mb-5 rounded-lg border-2 border-[#1C1C1C]">
            <Excalidraw />
          </div>
        </div>
      </div>
    )
  );
}

export default File;
