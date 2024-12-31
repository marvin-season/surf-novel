import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Badge from "../extentions/badge";
import { Markdown } from "tiptap-markdown";
import CodeBlockHighlight from "../extentions/code-block-highlight";

export default function useExtentions() {
  return [
    StarterKit,
    Badge,
    Markdown,
    CodeBlockHighlight,
    Placeholder.configure({
      // placeholder: "Please write something ...",
      placeholder({ node }) {
        console.log("node", node);
        return "hi";
      },
    }),
  ];
}
