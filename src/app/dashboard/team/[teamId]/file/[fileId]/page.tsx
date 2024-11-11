"use client";
import React, { useState, useEffect } from "react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCreateContentModal } from "@/store/use-create-content-modal";

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

  const [open, setOpen] = useCreateContentModal();
  const [showSaveReminder, setShowSaveReminder] = useState(false);
  const [hideReminder, setHideReminder] = useState(false);
  const [triggerSave, setTriggerSave] = useState(false);

  const { data: file, isLoading: fileLoading } = useGetFile({ id: fileId });

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowSaveReminder(true);
      const hideTimeout = setTimeout(() => {
        setHideReminder(true); // Start the blur transition
        setTimeout(() => setShowSaveReminder(false), 500);
      }, 5000);

      return () => clearTimeout(hideTimeout);
    }, 3000);

    return () => clearTimeout(showTimeout);
  }, []);
  const handleSaveWhiteboard = (content: string) => {};

  return (
    file && (
      <div className="flex flex-col min-h-screen items-start w-full">
        <div className="flex items-center justify-between w-full pt-8 pb-4 pr-2.5">
          <div className="flex justify-between items-center w-full">
            <div className="flex w-5/12 items-center justify-between">
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

              <div>
                <Button onClick={() => setOpen(true)}>
                  Create content with AI
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showSaveReminder && (
                <span
                  className={`ml-2 text-gray-500 text-sm save-reminder ${
                    hideReminder ? "hide" : ""
                  }`}
                >
                  Don't forget to save your work!
                </span>
              )}
              <Button onClick={() => setTriggerSave(!triggerSave)}>Save</Button>
            </div>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={20} defaultSize={40}>
            <Editor
              data={file?.document}
              holder="editor-holder"
              onSaveTrigger={() => {}}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="mb-8" />
          <ResizablePanel
            minSize={40}
            defaultSize={60}
            className="mb-4 mr-4 rounded-lg"
          >
            <Excalidraw data={file?.whiteboard} triggerSave={triggerSave} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  );
}

export default File;
