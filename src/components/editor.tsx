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
function Editor({
  data,
  onChange,
  holder,
}: {
  data: string;
  onChange: () => void;
  holder: string;
}) {
  //add a reference to editor
  const ref = useRef<EditorJS>();
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writting here..",
        tools: EDITOR_TOOLS,
        // data,
        // async onChange(api, event) {
        //   const content = await api.saver.save();
        //   // console.log(content, "sdfb");
        //   onChange(content);
        // },
      });
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
      <div
        id={holder}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default Editor;
