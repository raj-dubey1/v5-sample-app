import {
  CometChatTheme,
  fontHelper,
  TabsVisibility,
} from "@cometchat/uikit-resources";
import { ContactsStyle, TabItemStyle } from "@cometchat/uikit-shared";

import { CSSProperties } from "react";
import { TabsStyle } from "../../cometchat-pro-react-ui-kit/src/Shared/Views/CometChatTabs/TabsStyle";

type ButtonStyle = CSSProperties & { buttonIconTint?: string };
type HeaderStyle = CSSProperties;
type WrapperStyle = CSSProperties;
type ContentStyle = CSSProperties;

export function closeBtnStyle(
  contactsStyle: ContactsStyle,
  theme: CometChatTheme
): ButtonStyle {
  return {
    height: "24px",
    width: "24px",
    border: "none",
    borderRadius: "0",
    buttonIconTint: contactsStyle?.closeIconTint || theme.palette.getPrimary(),
    background: "transparent",
    position: "absolute",
    top: "8px",
    right: "12px",
  };
}

export function submitBtnWrapperStyle() {
  return {
    boxSizing: 'border-box',
  } as CSSProperties;
}


export function submitBtnStyle(contactsStyle: ContactsStyle | null, theme: CometChatTheme): any {
  return {
    background: contactsStyle?.submitButtonBackground || theme.palette.getPrimary(),
    buttonTextColor: contactsStyle?.submitButtonTextColor || theme.palette.getAccent900(),
    buttonTextFont: contactsStyle?.submitButtonTextFont || fontHelper(theme.typography.title2),
    height: "100%",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  };
}

export function contactsHeaderStyle(
  contactsStyle: ContactsStyle,
  theme: CometChatTheme
): HeaderStyle {
  return {
    height: "30px",
    textAlign: "center",
    font: contactsStyle?.titleTextFont || fontHelper(theme.typography.title1),
    padding: "10px 0px",
    color: contactsStyle?.titleTextColor || theme.palette.getAccent(),
  };
}

export function contactsWrapperStyle(
  contactsStyle: ContactsStyle,
  theme: CometChatTheme
): WrapperStyle {
  return {
    height: contactsStyle?.height || "94%",
    width: contactsStyle?.width || "100%",
    background: contactsStyle?.background || theme.palette.getBackground(),
    border: contactsStyle?.border || "none",
    borderRadius: contactsStyle?.borderRadius || "none",
    boxShadow: contactsStyle?.boxShadow || "0",
    padding: contactsStyle?.padding || "0",
    display: "flex",
    zIndex: 1
  };
}

export function getContactsStyle(
  contactsStyle: ContactsStyle,
  theme: CometChatTheme
): CSSProperties {
  return {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    //margin: "0 auto",
    //height:"100%"
  };
}

export function contactsContentStyle(): ContentStyle {
  return {
    height: "calc(100% - 50px)",
  };
}

export function getTabsStyle(
  contactsStyle: ContactsStyle,
  theme: CometChatTheme
) {
  return {
    height: "100%",
    width: "100%",
    tabListHeight: "30px",
    tabListBackground: "#ececec",
    tabListPadding: "2px 2px",
    tabListBorderRadius: "8px",
    tabPaneWidth: "100%",
    tabPaneHeight: "calc(100% - 30px)",
  } as TabsStyle;
}

export const getTabItemStyling = (
  contactsStyle: ContactsStyle,
  theme: CometChatTheme,
  tabVisibility: TabsVisibility | undefined,
  isActive: boolean
) => {
  return {
    width: tabVisibility === TabsVisibility.usersAndGroups ? "50%" : "100%",
    height: contactsStyle.tabHeight || "100%",
    borderRadius: contactsStyle.tabBorderRadius || "0",
    border: contactsStyle.tabBorder || "none",
    titleTextFont: contactsStyle.tabTitleTextFont || fontHelper(theme.typography.text2),
    titleTextColor: contactsStyle.tabTitleTextColor || theme.palette.getAccent(),
    activeTitleTextFont: contactsStyle.activeTabTitleTextFont || fontHelper(theme.typography.text2),
    activeTitleTextColor: contactsStyle.activeTabTitleTextColor || theme.palette.getAccent(),
    activeBackground: contactsStyle.activeTabBackground || theme.palette.getBackground(),
    activeBorderRadius: "8px",
    activeBorder: "2px solid red" || contactsStyle.activeTabBorder || "",
    background: contactsStyle.tabBackground || "#ececec",
    boxShadow:
      "0px 3px 8px rgba(20, 20, 20, 0.12), 0 3px 1px rgba(20, 20, 20, 0.04)",
  } as TabItemStyle;
};
