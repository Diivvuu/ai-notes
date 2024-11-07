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

export interface FILE {
  id: Id<"files">;
  teamId: Id<"teams">;
  document: string;
  whiteboard: string;
  name: string;
}
interface EditorProps {
  data: string;
  onChange: () => void;
  holder: string;
  onSaveTrigger: () => void;
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
function Editor({ data, onChange, holder, onSaveTrigger }: EditorProps) {
  const ref = useRef<EditorJS>();
  const router = useRouter();
  const fileId = useFileId();
  const { mutate, isSuccess, isError, isPending } = useUpdateDocument();
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Click me...",
        tools: EDITOR_TOOLS,

        onReady: () => {
          console.log("ready");
        },
        data: data && JSON.parse(data),
        async onChange(api, event) {
          const content = await api.saver.save();
          mutate({ id: fileId, document: JSON.stringify(content) });
          // onChange(content);
        },
      });

      // const getData = () => {
      //   editor
      //     .save()
      //     .then((outputData) => {
      //       console.log("Article data: ", outputData);
      //     })
      //     .catch((error) => {
      //       console.log("Saving failed: ", error);
      //     });
      // };
      // getData();
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div id={holder} />
    </>
  );
}

export default Editor;
