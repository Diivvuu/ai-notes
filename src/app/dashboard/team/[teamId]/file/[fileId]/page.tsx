"use client";
import Canvas from "@/components/canvas";
import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
const Excalidraw = dynamic(
  async () => (await import("@/components/canvas")).default,
  {
    ssr: false,
  }
);
function File() {
  return (
    <div className="flex items-start justify-center">
      <Editor data={"nice"} onChange={() => {}} holder="new content" />
      <Excalidraw />
    </div>
  );
}

export default File;
