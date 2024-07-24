import { AvatarStyle, BackdropStyle, BaseStyle, ConfirmDialogStyle, LabelStyle, ListItemStyle } from "@cometchat/uikit-elements";
import { CSSProperties } from "react";
import { CometChatDetailsOption, CometChatDetailsTemplate, CometChatTheme, fontHelper } from "@cometchat/uikit-resources";
import { AddMembersStyle, BannedMembersStyle, DetailsStyle, GroupMembersStyle, TransferOwnershipStyle } from "@cometchat/uikit-shared";

type ButtonStyle = CSSProperties & { buttonIconTint?: string, buttonTextFont?: string, buttonTextColor?: string };

export function detailsStyle(detailsStyleObject: DetailsStyle | null, theme: CometChatTheme): CSSProperties {

    return {
        boxSizing: "border-box",
        width: detailsStyleObject?.width || "100%",
        height: detailsStyleObject?.height || "100%",
        border: detailsStyleObject?.border || "none",
        borderRadius: detailsStyleObject?.borderRadius || "0",
        background: detailsStyleObject?.background || theme.palette.getBackground(),
        position: "relative",
        padding: "19px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden"
    };
}

export function detailsContentWrapperStyle(detailsStyleObject: DetailsStyle | null): CSSProperties {
    return {
        // padding: detailsStyleObject?.padding || "0",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto"
    };
}

export function headerStyle(): CSSProperties {
    return {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        width: '100%',
        paddingBottom: "19px"
    };
}

export function profileStyle(): CSSProperties {
    return {
        overflowX: "auto"
    };
}

export function titleStyle(detailsStyleObject: DetailsStyle | null, theme: CometChatTheme): LabelStyle {
    return {
        background: "inherit",
        textFont: detailsStyleObject?.titleTextFont || fontHelper(theme.typography.title1),
        textColor: detailsStyleObject?.titleTextColor || theme.palette.getAccent()
    } as LabelStyle
}

export function closeBtnStyle(detailsStyleObject: DetailsStyle | null, theme: CometChatTheme): ButtonStyle {
    return {
        width: "24px",
        height: "24px",
        background: "transparent",
        border: "none",
        borderRadius: "0",
        buttonIconTint: detailsStyleObject?.closeButtonIconTint || theme.palette.getPrimary(),
        position: "absolute",
        right: "12px"
    };
}

export function listItemStyle(listItemStyleObject: ListItemStyle | null, theme: CometChatTheme): ListItemStyle {
    return {
        width: listItemStyleObject?.width || "100%",
        height: listItemStyleObject?.height || "fit-content",
        border: listItemStyleObject?.border || "none",
        borderRadius: listItemStyleObject?.borderRadius || "0",
        background: listItemStyleObject?.background || "inherit",
        activeBackground: listItemStyleObject?.activeBackground || "transparent",
        hoverBackground: listItemStyleObject?.hoverBackground || "transparent",
        separatorColor: listItemStyleObject?.separatorColor || theme.palette.getAccent200(),
        titleFont: listItemStyleObject?.titleFont || fontHelper(theme.typography.title2),
        titleColor: listItemStyleObject?.titleColor || theme.palette.getAccent()
    };
}

export function statusIndicatorStyle(statusIndicatorStyleObject: CSSProperties | null, theme: CometChatTheme): CSSProperties {
    const obj = statusIndicatorStyleObject ?? {};

    return {
        ...obj,
        width: statusIndicatorStyleObject?.width || "12px",
        height: statusIndicatorStyleObject?.height || "12px",
        border: statusIndicatorStyleObject?.border || "none",
        borderRadius: statusIndicatorStyleObject?.borderRadius || "24px"
    };
}

export function avatarStyle(avatarStyleObject: AvatarStyle | null, theme: CometChatTheme): AvatarStyle {
    return {
        width: avatarStyleObject?.width || "36px",
        height: avatarStyleObject?.height || "36px",
        border: avatarStyleObject?.border || "none",
        borderRadius: avatarStyleObject?.borderRadius || "24px",
        backgroundColor: avatarStyleObject?.backgroundColor || theme.palette.getAccent700(),
        backgroundSize: avatarStyleObject?.backgroundSize || "cover",
        nameTextFont: avatarStyleObject?.nameTextFont || fontHelper(theme.typography.subtitle1),
        nameTextColor: avatarStyleObject?.nameTextColor || theme.palette.getAccent900(),
        outerViewBorderWidth: avatarStyleObject?.outerViewBorderWidth || "0",
        outerViewBorderRadius: avatarStyleObject?.outerViewBorderRadius || "0",
        outerViewBorderColor: avatarStyleObject?.outerViewBorderColor || "",
        outerViewBorderSpacing: avatarStyleObject?.outerViewBorderSpacing || "0"
    };
}

export function subtitleStyle(isUserOnline: boolean, detailsStyleObject: DetailsStyle | null, theme: CometChatTheme): LabelStyle {
    return {
        background: "inherit",
        textFont: detailsStyleObject?.subtitleTextFont || fontHelper(theme.typography.subtitle2),
        textColor: isUserOnline ? theme.palette.getPrimary() : detailsStyleObject?.subtitleTextColor
    };
}

export function sectionListStyle(): CSSProperties {
    return {
        flexGrow: "1",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0"
        // rowGap: "32px"
    };
}

export function sectionHeaderWrapperStyle(): CSSProperties {
    return {
        textAlign: 'left'
    };
}

export function sectionHeaderStyle(template: CometChatDetailsTemplate): LabelStyle {

    return {
        background: "inherit",
        textFont: template.titleFont,
        textColor: template.titleColor,
    };
}

export function optionsStyle(): CSSProperties {
    return {
        display: "flex",
        flexDirection: "column",
        // rowGap: "8px"
    };
}

export function optionBtnStyle(option: CometChatDetailsOption): ButtonStyle {

    return {
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        buttonTextFont: option.titleFont,
        buttonTextColor: option.titleColor,
        backgroundColor: option.backgroundColor || "inherit",
        buttonIconTint: option.iconTint,
        padding: '18px 0 16px 0'
    };
}

export function defaultOptionContentStyle(): CSSProperties {
    return {
        position: "relative"
    };
}

export function tailWrapperStyle(): CSSProperties {
    return {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)"
    };
}

export function defaultOptionStyle(): CSSProperties {
    return {
        display: "flex",
        flexDirection: "column",
        // rowGap: "4px"
    };
}

export function pageWrapperStyle(): CSSProperties {
    return {
        position: "absolute",
        top: "0",
        left: "0",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "inherit"
    };
}

export function backdropStyle(backdropStyleObject: BaseStyle | null, detailsStyle: DetailsStyle | null): BackdropStyle {
    return {
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        width: detailsStyle?.width,
        height: detailsStyle?.height,
        ...backdropStyleObject,
    };
}

export function leaveDialogStyle(confirmDialogStyleObject: ConfirmDialogStyle | null, detailsStyle: DetailsStyle | null, theme: CometChatTheme): ConfirmDialogStyle {
    return {
        confirmButtonBackground: confirmDialogStyleObject?.confirmButtonBackground || theme.palette.getPrimary(),
        cancelButtonBackground: confirmDialogStyleObject?.cancelButtonBackground || theme.palette.getSecondary(),
        confirmButtonTextColor: confirmDialogStyleObject?.confirmButtonTextColor || theme.palette.getAccent900("light"),
        confirmButtonTextFont: confirmDialogStyleObject?.confirmButtonTextFont || fontHelper(theme.typography.text2),
        cancelButtonTextColor: confirmDialogStyleObject?.cancelButtonTextColor || theme.palette.getAccent900("dark"),
        cancelButtonTextFont: confirmDialogStyleObject?.cancelButtonTextFont || fontHelper(theme.typography.text2),
        titleFont: confirmDialogStyleObject?.titleFont || fontHelper(theme.typography.title1),
        titleColor: confirmDialogStyleObject?.titleColor || theme.palette.getAccent(),
        messageTextFont: confirmDialogStyleObject?.messageTextFont || fontHelper(theme.typography.subtitle2),
        messageTextColor: confirmDialogStyleObject?.messageTextColor || theme.palette.getAccent600(),
        background: confirmDialogStyleObject?.background || detailsStyle?.background || theme.palette.getBackground(),
        width: confirmDialogStyleObject?.width || "320px",
        height: confirmDialogStyleObject?.height || "100%",
        border: confirmDialogStyleObject?.border || `1px solid ${theme.palette.getAccent200()}`,
        borderRadius: confirmDialogStyleObject?.borderRadius || "8px",
        boxShadow: confirmDialogStyleObject?.boxShadow
    }
}

export function deleteDialogStyle(confirmDialogStyleObject: ConfirmDialogStyle | null, theme: CometChatTheme): ConfirmDialogStyle {
    return {
        confirmButtonBackground: confirmDialogStyleObject?.confirmButtonBackground || theme.palette.getError(),
        cancelButtonBackground: confirmDialogStyleObject?.cancelButtonBackground || theme.palette.getSecondary(),
        confirmButtonTextColor: confirmDialogStyleObject?.confirmButtonTextColor || theme.palette.getAccent900("light"),
        confirmButtonTextFont: confirmDialogStyleObject?.confirmButtonTextFont || fontHelper(theme.typography.text2),
        cancelButtonTextColor: confirmDialogStyleObject?.cancelButtonTextColor || theme.palette.getAccent900("dark"),
        cancelButtonTextFont: confirmDialogStyleObject?.cancelButtonTextFont || fontHelper(theme.typography.text2),
        titleFont: confirmDialogStyleObject?.titleFont || fontHelper(theme.typography.title1),
        titleColor: confirmDialogStyleObject?.titleColor || theme.palette.getAccent(),
        messageTextFont: confirmDialogStyleObject?.messageTextFont || fontHelper(theme.typography.subtitle2),
        messageTextColor: confirmDialogStyleObject?.messageTextColor || theme.palette.getAccent600(),
        background: confirmDialogStyleObject?.background || theme.palette.getBackground(),
        width: confirmDialogStyleObject?.width || "320px",
        height: confirmDialogStyleObject?.height || "100%",
        border: confirmDialogStyleObject?.border || `1px solid ${theme.palette.getAccent200()}`,
        borderRadius: confirmDialogStyleObject?.borderRadius || "8px",
        boxShadow: confirmDialogStyleObject?.boxShadow
    }
}

export function dividerStyle(separatorColor: string | undefined, isSectionSeparatorStyle: boolean, theme: CometChatTheme): BaseStyle {
    return {
        width: "100%",
        height: (isSectionSeparatorStyle ? "2" : "1") + "px",
        background: separatorColor || theme.palette.getAccent200()
    };
}

export const getSectionStyle = () => {
    return {
        padding: '16px 0'
    }
}

export const getGroupMembersStyle = (detailsStyle: DetailsStyle | null): GroupMembersStyle => {


    return {
        background: detailsStyle?.background,

    };
}

export const getAddMembersStyle = (detailsStyle: DetailsStyle | null): AddMembersStyle => {

    return {
        background: detailsStyle?.background,

    }
}

export const getBannedMembersStyle = (detailsStyle: DetailsStyle | null): BannedMembersStyle => {

    return {
        background: detailsStyle?.background,
    }
}

export const getTransferOwnershipStyle = (detailsStyle: DetailsStyle | null): TransferOwnershipStyle => {
    return {
        background: detailsStyle?.background,

    }
}
