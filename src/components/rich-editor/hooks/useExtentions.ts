import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Badge from "../extentions/badge";

export default function useExtentions() {
  return [
    StarterKit,
    Placeholder.configure({
      placeholder: "Please write something ...",
    }),
    Badge,
  ];
}
