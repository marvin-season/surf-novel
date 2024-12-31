import { createContext, useContext } from "react";

const defaultValue = {} as ReturnType<any>;

export const ChatContext = createContext(defaultValue);

export const NoteProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: typeof defaultValue;
}) => {
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
