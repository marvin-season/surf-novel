import { Node, CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    badge: {
      /**
       * Set a badge mark
       */
      setBadge: (attributes: BadgeAttributes) => ReturnType;
      /**
       * Toggle a badge mark
       */
      toggleBadge: (attributes: BadgeAttributes) => ReturnType;
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
            "data-badge": true,
            style: `background-color: ${attributes.color}; color: white; padding: 2px 4px; border-radius: 4px;`,
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
        tag: "span[data-badge]",
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return ["span", HTMLAttributes, node.attrs.text];
  },

  addCommands() {
    return {
      setBadge:
        (attributes) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },
});

export default Badge;
