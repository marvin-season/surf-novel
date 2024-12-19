import { Node, CommandProps, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    badge: {
      /**
       * Set a badge mark
       */
      setBadge: (color: string, text: string) => ReturnType;
      /**
       * Toggle a badge mark
       */
      toggleBadge: () => ReturnType;
      /**
       * Unset a badge mark
       */
      unsetBadge: () => ReturnType;
    };
  }
}

interface BadgeAttributes {
  HTMLAttributes: Record<string, unknown>;
  color: string;
  text: string;
}

const Badge = Node.create<BadgeAttributes>({
  name: "badge",

  group: "inline",

  inline: true,

  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        style: `padding: 1px 2px; margin-left: 1px; margin-right: 1px; border-radius: 4px;`,
      },
      color: "red",
      text: "",
    };
  },
  addAttributes() {
    return {
      color: {
        default: "red",
        // 节点属性后续会被合并
        renderHTML: (attributes: BadgeAttributes) => {
          return {
            style: `background-color: ${attributes.color}; color: white;`,
          };
        },
      },
      text: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },
  // 最终渲染
  renderHTML({ HTMLAttributes, node }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, {
        style: HTMLAttributes.style,
      }),
      node.attrs.text,
    ];
  },

  addCommands() {
    return {
      setBadge:
        (color: string, text: string) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: { color, text },
          });
        },
    };
  },
});

export default Badge;
