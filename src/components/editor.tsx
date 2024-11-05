"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";

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

function Editor() {
  const ref = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      holder: "editorjs",
      tools: {
        header: {
          class: Header as any, // Type assertion to bypass strict type checking
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist as any,
          inlineToolbar: true,
        },
        paragraph: Paragraph as any,
        warning: Warning as any,
      },
      data: rawDocument,
    });
    ref.current = editor;
  };

  useEffect(() => {
    initEditor();

    // Cleanup editor instance on component unmount
    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
}

export default Editor;
