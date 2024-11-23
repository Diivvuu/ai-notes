import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import { useUpdateDocument } from "@/features/files/api/use-update-doc";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useFileId } from "@/hooks/use-file";

// export interface FILE {
//   id: Id<"files">;
//   teamId: Id<"teams">;
//   document: string;
//   whiteboard: string;
//   name: string;
// }
interface EditorProps {
  key: number;
  data: string;
  holder: string;
  isSaveTriggered: boolean;
  onSaveTrigger: (content: any) => void;
}
const EDITOR_TOOLS: { [toolName: string]: any } = {
  code: Code,
  header: {
    class: Header,
    shortcut: "CMD+H",
    inlineToolbar: true,
    config: {
      placeholder: "Enter a Header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checklist: Checklist,
  inlineCode: InlineCode,
  table: Table,
  list: {
    class: List,
    inlineToolbar: true,
  },
  quote: Quote,
  delimiter: Delimiter,
};
const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};
function Editor({
  data,
  holder,
  isSaveTriggered,
  onSaveTrigger,
  key,
}: EditorProps) {
  const ref = useRef<EditorJS>();
  const router = useRouter();
  const fileId = useFileId();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 200;

  const { mutate, isSuccess, isError, isPending } = useUpdateDocument();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Click me...",
        tools: EDITOR_TOOLS,

        // onReady: () => {
        //   console.log("ready");
        // },
        data: data ? JSON.parse(data) : rawDocument,
        async onChange(api, event) {
          const content = await api.saver.save();
          if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
          }
          debounceTimeout.current = setTimeout(() => {
            mutate({ id: fileId, document: JSON.stringify(content) });
          }, debounceDelay);
        },
      });
      console.log(data);
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [key]);
  useEffect(() => {
    console.log("isSaveTriggered:", isSaveTriggered); // Log the value of isSaveTriggered

    if (isSaveTriggered && ref.current) {
      const saveCurrentContent = async () => {
        if (ref.current) {
          try {
            const content = await ref.current.save(); // Get the current content
            console.log("Saving content:", content); // Log content to ensure it's being fetched

            // Send content back to parent component via onSaveTrigger
            onSaveTrigger(content); // Pass content to the parent component
          } catch (error) {
            console.error("Error saving content:", error);
          }
        } else {
          console.log("Editor instance not available.");
        }
      };

      saveCurrentContent(); // Call the save function
    }
  }, [isSaveTriggered, onSaveTrigger]); // Trigger this effect when isSaveTriggered changes

  return (
    <>
      <div id={holder} />
    </>
  );
}

export default Editor;
