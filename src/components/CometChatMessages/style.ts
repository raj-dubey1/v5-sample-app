import {
  DetailsStyle,
  MessageComposerStyle,
  MessageHeaderStyle,
  MessageListStyle,
  MessagesStyle,
} from "@cometchat/uikit-shared";

import { CSSProperties } from "react";
import { CometChatTheme } from "@cometchat/uikit-resources";

export const MessagesWrapperStyle = (
  messagesStyle: MessagesStyle | undefined,
  theme: CometChatTheme
) => {
  return {
    display: "flex",
    position: "relative",
    width: messagesStyle?.width || "100%",
    height: messagesStyle?.height || "100%",
    border: messagesStyle?.border || "0 none",
    borderRadius: messagesStyle?.borderRadius || "inherit",
    background: messagesStyle?.background || theme.palette.getBackground(),
  } as CSSProperties;
};

export const MessagesDivStyle = () => {
  return {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    justifyContent: "space-between",
    borderRadius: "inherit",
  } as CSSProperties;
};

export const ThreadedMessagesDivStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  maxHeight: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  maxWidth: "100%",
  zIndex: "1",
} as CSSProperties;

export const MessagesDetailsDivStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  maxHeight: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  maxWidth: "100%",
  zIndex: "1",
  borderRadius: "inherit",
} as CSSProperties;

export const MessagesHeaderDivStyle = {
  // height: "60px",
  width: "100%",
  borderRadius: "inherit",
} as CSSProperties;

export const MessagesListDivStyle = {
  // height: "calc(100% - 160px",
  height: "100%",
  width: "100%",
  overflow: "hidden",
} as CSSProperties;

export const CometChatThreadedMessagesDivStyle = {
  height: "100%",
  display: "flex",
} as CSSProperties;

export const MessagesComposerDivStyle = (theme: CometChatTheme) => {
  return {
    // height: "96px",
    width: "100%",
    display: "flex",
  } as CSSProperties;
};

export const liveReactionStyle = () => {
  return {
    position: "absolute",
    bottom: "50px",
    right: "16px",
    width: "50%",
    height: "100%",
  } as CSSProperties;
};

export const getMessageHeaderStyle = (

) => {
  return {
    border: "0 none",
    background: "inherit",
    borderRadius: "inherit",

  } as MessageHeaderStyle;
};

export const getMessageListStyle = (

) => {
  return {
    ...{
      border: "0 none",
      background: "inherit",
      borderRadius: "inherit",
    }
  } as MessageListStyle;
};

export const getMessageComposerStyle = (

) => {
  return {

  } as MessageComposerStyle;
};



export function detailsButtonStyle(theme: CometChatTheme) {
  return {
    height: "24px",
    width: "24px",
    border: "none",
    borderRadius: "0",
    background: "transparent",
    buttonIconTint: theme.palette.getPrimary(),
    padding: 0,
  };
}


export const panelDivStyle = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  zIndex: 1000,
  overflow: "hidden",
} as React.CSSProperties;
