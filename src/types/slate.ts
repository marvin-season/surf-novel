import { Descendant } from "slate";

export type CustomElementType =
  | "paragraph"
  | "bulleted-list"
  | "numbered-list"
  | "block-quote"
  | "h1"
  | "h2"
  | "h3";

// Define the types for your Slate nodes
export type CustomElement = {
  type: CustomElementType;
  children: Descendant[];
  align?: string;
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type CustomNode = CustomElement | CustomText;
