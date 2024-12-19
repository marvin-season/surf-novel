import { Node, CommandProps } from "@tiptap/core";

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
  color: string;
  text: string;
}

const Badge = Node.create<BadgeAttributes>({
  name: "badge",

  group: "inline",

  inline: true,

  atom: true,

  addAttributes() {
    return {
      color: {
        default: "red",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-color") || "red",
        renderHTML: (attributes: BadgeAttributes) => {
          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; color: white; padding: 2px 4px; border-radius: 4px;`,
          };
        },
      },
      text: {
        default: "",
        parseHTML: (element: HTMLElement) => element.innerText,
        renderHTML: (attributes: BadgeAttributes) => {
          return {
            "data-text": attributes.text,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-badge]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      { "data-badge": "", ...HTMLAttributes },
      HTMLAttributes["data-text"],
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
