import { Node, CommandProps, mergeAttributes } from "@tiptap/core";

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
  HTMLAttributes: Record<string, any>;
}

const Badge = Node.create<BadgeAttributes>({
  name: "badge",

  group: "inline",

  inline: true,

  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        style: "color: white; padding: 2px 4px; border-radius: 4px;",
        "data-type": this.name,
      },
      color: "red",
      text: "",
    };
  },

  addAttributes() {
    return {
      color: {
        default: "red",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-color") || "red",
        renderHTML: (attributes: BadgeAttributes) => {
          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color};`,
          };
        },
      },
      text: {
        default: "",
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type=${this.name}]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      node.attrs.text,
    ];
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
