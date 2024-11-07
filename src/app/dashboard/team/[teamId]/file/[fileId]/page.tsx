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
// Dynamically import EditorJS and Excalidraw components with SSR disabled
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
const Excalidraw = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

function File() {
  return (
    <div className="flex flex-col min-h-screen items-start w-full">
      <div className="pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
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
