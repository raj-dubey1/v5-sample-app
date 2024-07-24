import { CometChatTheme, fontHelper } from "@cometchat/uikit-resources";

import { CSSProperties } from "react";

export const ThreadedMessagesWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  } as CSSProperties;
};

export const ThreadedMessagesHeaderStyle = () => {
  return {
    padding: "16px",
    width: "100%",
    display: "flex",
    boxSizing: "border-box",
  } as CSSProperties;
};

export const ThreadedMessagesCloseButtonStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    width: "24px",
  };
};

export const ThreadedMessagesTitleStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(100% - 24px)",
  };
};

export const ThreadedMessagesBubbleViewStyle = () => {
  return {
    display: "flex",
    width: "100%",
    height: "fit-content",
    padding: "8px 16px",
    boxSizing: "border-box",
    maxHeight: "20em",
    overflow: "hidden scroll",
  } as CSSProperties;
};

export const ThreadedMessagesActionViewStyle = (theme: CometChatTheme) => {
  return {
    height: "36px",
    padding: "8px 16px",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.getAccent100()}`,
  } as CSSProperties;
};

export const ThreadedMessagesListStyle = () => {
  return {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  } as CSSProperties;
};

export const ThreadedMessagesComposerStyle = () => {
  return {
    height: "fit-content",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "90px"
  } as CSSProperties;
};

export const threadedMessageListStyle = () => {
  return {
    width: "100%",
    height: "calc(100% - 156px)",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties;
};

export const actionButtonStyle = (theme: CometChatTheme) => {
  return {
    height: "100%",
    width: "100%",
    border: `0 none`,
    borderRadius: "0",
    // padding: "8px 16px",
    background: `${theme.palette.getBackground()}`,
    buttonTextFont: `${fontHelper(theme.typography.subtitle1)}`,
    buttonTextColor: `${theme.palette.getAccent600()}`,
  } as CSSProperties;
};
