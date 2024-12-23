import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Mention from "@tiptap/extension-mention";
import suggestion from "./mention/suggestion";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Badge from "./Badge";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { TiptapCollabProvider } from "@hocuspocus/provider";
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
import * as Y from "yjs";
import { getStore } from "@/lib/store";
const useremail = JSON.parse((await getStore("user")) || "{}")?.email;

const getCollectionExtensions = () => {
  const appId = "7j9y6m10";
  const room = `room.${new Date().getFullYear().toString().slice(-2)}${
    new Date().getMonth() + 1
  }${new Date().getDate()}-ok`;

  // ydoc and provider for Editor A
  const ydoc = new Y.Doc();
  const provider = new TiptapCollabProvider({
    appId,
    name: room,
    document: ydoc,
  });
  return [
    Collaboration.extend().configure({
      document: ydoc,
    }),
    CollaborationCursor.extend().configure({
      provider: provider,
      user: {
        name: useremail,
        color: "#ff0000",
      },
    }),
  ];
};

export const useExtensions = ({ collaborationEnabled = false }) => {
  const collaboration = collaborationEnabled ? getCollectionExtensions() : [];
  return [
    StarterKit,
    Typography,
    Markdown,

    Mention.configure({
      HTMLAttributes: {
        class: "mention",
      },
      suggestion,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Badge,
    Highlight.configure({ multicolor: true }),
    Placeholder.configure({
      placeholder: "Please write something ...",
    }),
    ...collaboration,
  ];
};
