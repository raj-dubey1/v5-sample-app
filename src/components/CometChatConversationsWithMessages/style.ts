import { CometChatTheme, fontHelper } from "@cometchat/uikit-resources";
import {

  MessageHeaderStyle,

  MessagesStyle,
  WithMessagesStyle,
} from "@cometchat/uikit-shared";

import { CSSProperties } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { LabelStyle } from "@cometchat/uikit-elements";

const labelStyle: LabelStyle = {
  height: "100%",
  width: "100%",
  background: "transparent",
  border: "none",
  borderRadius: "0",
  textFont: "700 22px Inter, sans-serif",
  textColor: "rgba(20, 20, 20, 0.33)",
};

const WithMessagesWrapperStyle = {
  display: "flex",
  height: "100%",
  width: "100%",
  boxSizing: "border-box",
  position: "relative",
} as CSSProperties;

const WithMessagesMainStyle = {
  width: "calc(100% - 280px)",
  height: "100%",
} as CSSProperties;

const MobileLayoutStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
} as CSSProperties;

const EmptyMessagesDivStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "inherit",
  border: "none",
  borderRadius: "inherit",
  width: "100%",
  height: "auto",
} as CSSProperties;

const WithMessagesSidebarStyle = {
  width: "280px",
  height: "100%",
  position: "relative",
} as CSSProperties;

export const getConversationsWrapperStyles = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  theme: CometChatTheme
) => {
  return {
    ...WithMessagesWrapperStyle,
    width: "100%",
    height: "100%",
    border: `1px solid ${theme.palette.getAccent100()}`,
    borderRadius: "0",
    background: theme.palette.getBackground(),
    ...conversationsWithMessagesStyle,
  } as CSSProperties;
};

export const getWithMessagesSidebarStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  theme: CometChatTheme,
  isMobileView: boolean | undefined,
  activeUser: CometChat.User | null,
  activeGroup: CometChat.Group | null
) => {
  if (isMobileView) {
    return getMobileViewSidebarStyle(activeUser, activeGroup);
  } else {
    return getDesktopViewSidebarStyle(conversationsWithMessagesStyle, theme);
  }
};

const getMobileViewSidebarStyle = (
  activeUser: CometChat.User | null,
  activeGroup: CometChat.Group | null
) => {
  const visibility =
    activeUser || activeGroup
      ? { visibility: "hidden" }
      : { visibility: "visible" };
  return {
    ...visibility,
    ...MobileLayoutStyle,
    borderRadius: "inherit",
  } as CSSProperties;
};

const getDesktopViewSidebarStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  theme: CometChatTheme
) => {
  const borderRadius = conversationsWithMessagesStyle?.borderRadius || 0;
  return {
    ...WithMessagesSidebarStyle,
    borderRight:
      conversationsWithMessagesStyle?.border ||
      `1px solid ${theme.palette.getAccent100()}`,
    borderRadius: `${borderRadius} 0 0 ${borderRadius}`,
  } as CSSProperties;
};

export const getWithMessagesMainStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  isMobileView: boolean | undefined,
  activeUser: CometChat.User | null,
  activeGroup: CometChat.Group | null
) => {
  if (isMobileView) {
    return getMobileViewMainStyle(activeUser, activeGroup);
  } else {
    return getDesktopViewMainStyle(conversationsWithMessagesStyle);
  }
};

const getMobileViewMainStyle = (
  activeUser: CometChat.User | null,
  activeGroup: CometChat.Group | null
) => {
  const visibility =
    activeUser || activeGroup
      ? { visibility: "visible" }
      : { visibility: "hidden" };
  return {
    ...visibility,
    ...MobileLayoutStyle,
    borderRadius: "inherit",
  } as CSSProperties;
};

const getDesktopViewMainStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined
) => {
  const borderRadius = conversationsWithMessagesStyle?.borderRadius || 0;
  return {
    ...WithMessagesMainStyle,
    borderRadius: `0 ${borderRadius} ${borderRadius} 0`,
  };
};

export const getLabelStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  theme: CometChatTheme
) => {
  return {
    ...labelStyle,
    textFont:
      conversationsWithMessagesStyle?.messageTextFont ||
      fontHelper(theme.typography.title1),
    textColor:
      conversationsWithMessagesStyle?.messageTextColor ||
      theme.palette.getAccent600(),
  } as LabelStyle;
};

export const getConversationsStyle = (
) => {
  return {
    width: "100%",
    height: "100%",
    border: "0 none",
    borderRadius: "inherit",
    background: "inherit"
  };
};

export const getMessageHeaderStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  isMobileView: boolean | undefined
) => {
  const borderRadius = conversationsWithMessagesStyle?.borderRadius;
  return {
    borderRadius: isMobileView
      ? `${borderRadius} ${borderRadius} 0 0`
      : `0px ${borderRadius} 0px 0px`,
  } as MessageHeaderStyle;
};

export const getMessageComposerStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,
  isMobileView: boolean | undefined
) => {
  const borderRadius = conversationsWithMessagesStyle?.borderRadius;
  return {
    borderRadius: isMobileView
      ? `0 0 ${borderRadius} ${borderRadius}`
      : `0px 0 ${borderRadius} 0px`,

  };
};

export const getMessagesStyle = (
  messagesStyle?: MessagesStyle,
  conversationsWithMessagesStyle?: WithMessagesStyle | undefined
) => {
  return { ...{ background: conversationsWithMessagesStyle?.background }, ...messagesStyle }
};

export const getEmptyMessageLayoutStyle = (
  isMobileView: boolean | undefined,
  activeUser: CometChat.User | null,
  activeGroup: CometChat.Group | null
) => {
  let visibility = { visibility: "hidden" };
  if (!activeUser && !activeGroup && !isMobileView) {
    visibility = { visibility: "visible" };
  }

  return {
    ...EmptyMessagesDivStyle,
    ...visibility,
    width: `calc(100% - 280px)`,
  } as CSSProperties;
};

export const getBackdropStyle = (
  conversationsWithMessagesStyle: WithMessagesStyle | undefined,

) => {
  return {
    height:

      conversationsWithMessagesStyle?.height,
    width:

      conversationsWithMessagesStyle?.width,
    background:

      "rgba(0, 0, 0, 0.5)",
    border: "0 none",
    borderRadius:
      "0",
  };
};

export const getButtonStyle = (
  showCometChatContacts: boolean,
  theme: CometChatTheme
) => {
  return {
    height: "24px",
    width: "24px",
    border: "none",
    borderRadius: "0",
    background: "transparent",
    buttonIconTint: showCometChatContacts
      ? theme.palette.getAccent600()
      : theme.palette.getPrimary(),
  };
};
