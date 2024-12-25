import { AIHighlight } from "../extentions/highlight/ai-highlight";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import AiWriter from "../extentions/ai-writer/ai-writer";

export default function useAdvancedExtentions() {
  return [
    AiWriter.configure({}),
    TextStyle,
    Color,
    AIHighlight,
    Highlight.configure({ multicolor: true }),
  ];
}
