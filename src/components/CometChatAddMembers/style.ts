import { CSSProperties } from "react";
import { CometChatTheme, fontHelper } from "@cometchat/uikit-resources";
import { AddMembersStyle, UsersStyle } from "@cometchat/uikit-shared";

type ButtonStyle = CSSProperties & {buttonIconTint? : string};

export function addMembersStyle(addMembersStyleObject : AddMembersStyle | null, theme : CometChatTheme) : CSSProperties {
    return {
        position: "relative",
        width: addMembersStyleObject?.width || "100%",
        height: addMembersStyleObject?.height || "100%",
        background: addMembersStyleObject?.background || theme.palette.getBackground(),
        border: addMembersStyleObject?.border || "none",
        borderRadius: addMembersStyleObject?.borderRadius || "0",
        boxShadow: addMembersStyleObject?.boxShadow,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: addMembersStyleObject?.padding || '0',
        overflow: "hidden"
    };
}

export function usersStyle(addMembersStyleObject : AddMembersStyle | null, theme : CometChatTheme) : UsersStyle {
    return new UsersStyle({
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        background: "inherit",
        titleTextFont: addMembersStyleObject?.titleTextFont || fontHelper(theme.typography.title1),
        titleTextColor: addMembersStyleObject?.titleTextColor || theme.palette.getAccent(),
        emptyStateTextFont: addMembersStyleObject?.emptyStateTextFont || fontHelper(theme.typography.title1),
        emptyStateTextColor: addMembersStyleObject?.emptyStateTextColor || theme.palette.getAccent600(),
        errorStateTextFont: addMembersStyleObject?.errorStateTextFont || fontHelper(theme.typography.title1),
        errorStateTextColor: addMembersStyleObject?.errorStateTextColor || theme.palette.getAccent600(),
        loadingIconTint: addMembersStyleObject?.loadingIconTint || theme.palette.getAccent600(),
        onlineStatusColor: addMembersStyleObject?.onlineStatusColor || theme.palette.getSuccess(),
        separatorColor: addMembersStyleObject?.separatorColor || theme.palette.getAccent50(),
        searchIconTint: addMembersStyleObject?.searchIconTint || theme.palette.getAccent400(),
        searchBorder: addMembersStyleObject?.searchBorder || `1px solid ${theme.palette.getAccent50()}`,
        searchBorderRadius: addMembersStyleObject?.searchBorderRadius || "8px",
        searchBackground: addMembersStyleObject?.searchBackground || theme.palette.getAccent50(),
        searchPlaceholderTextFont: addMembersStyleObject?.searchPlaceholderTextFont || fontHelper(theme.typography.subtitle1),
        searchPlaceholderTextColor: addMembersStyleObject?.searchPlaceholderTextColor || theme.palette.getAccent400(),
        searchTextFont: addMembersStyleObject?.searchTextFont || fontHelper(theme.typography.subtitle1),
        searchTextColor: addMembersStyleObject?.searchTextColor || theme.palette.getAccent(),
        sectionHeaderTextFont: addMembersStyleObject?.sectionHeaderTextFont,
        sectionHeaderTextColor: addMembersStyleObject?.sectionHeaderTextColor
    });
}

export function addMembersButtonStyle(addMembersStyleObject : AddMembersStyle | null, theme : CometChatTheme) : any {
    return {    
        background: addMembersStyleObject?.addMembersButtonBackground || theme.palette.getPrimary(),
        buttonTextColor: addMembersStyleObject?.addMembersButtonTextColor || theme.palette.getAccent900(),
        buttonTextFont: addMembersStyleObject?.addMembersButtonTextFont || fontHelper(theme.typography.title2),
        width: "100%",
        border: "none",
        borderRadius: "8px",
        padding: "16px 0",
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    };
}

export function defaultBackBtnStyle(addMembersStyleObject : AddMembersStyle | null, theme : CometChatTheme) : ButtonStyle {
    return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint: addMembersStyleObject?.backButtonIconTint || theme.palette.getPrimary() || "",
        background: "transparent",
        position: "absolute",
        left: "19px",
        top: "19px"
    };
}

export function closeBtnStyle(addMembersStyleObject : AddMembersStyle | null, theme : CometChatTheme) : ButtonStyle {
    return {
        height: "24px",
        width: "24px",
        border: "none",
        borderRadius: "0",
        buttonIconTint: addMembersStyleObject?.closeButtonIconTint || theme.palette.getPrimary() || "",
        background: "transparent",
        position: "absolute",
        top: "19px",
        right: "19px"
    }; 
}

export function getAddMembersBtnStyle() {
    return {
        padding: '16px',
        boxSizing: 'border-box'
    } as CSSProperties;
}

/*
export function contentWrapperStyle(addMembersStyleObject : AddMembersStyle | null) : CSSProperties {
    return { 
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        display: "flex", 
        flexDirection: "column", 
        rowGap: "8px",
        padding: addMembersStyleObject?.padding,
    };
}
*/
