import { BubbleMenu, Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react";

export default function BubbleMenuList({ editor }: { editor: Editor }) {
  const buttonBaseClasses =
    "p-1 text-[12px] hover:bg-gray-100 rounded-[8px] cursor-pointer";

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu bg-white rounded-[10px] flex gap-2 p-2 shadow-md">
        <div
          className={`${buttonBaseClasses} font-bold ${
            editor.isActive("bold") ? "bg-gray-100" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold size={12} />
        </div>
        <div
          className={`${buttonBaseClasses} font-italic ${
            editor.isActive("italic") ? "bg-gray-100" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic size={12} />
        </div>
        <div
          className={`${buttonBaseClasses} line-through ${
            editor.isActive("strike") ? "bg-gray-100" : ""
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
        >
          <Strikethrough size={12} />
        </div>
      </div>
    </BubbleMenu>
  );
}
