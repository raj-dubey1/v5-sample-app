import { AvatarStyle, LabelStyle, ListItemStyle, RadioButtonStyle } from "@cometchat/uikit-elements";
import { CometChatTheme, fontHelper } from "@cometchat/uikit-resources";
import { GroupMembersStyle, TransferOwnershipStyle } from "@cometchat/uikit-shared";

import { CSSProperties } from "react";

type ButtonStyle = CSSProperties & {buttonIconTint? : string};

export function transferOwnershipStyle(transferOwnershipStyleObject : TransferOwnershipStyle | null, theme : CometChatTheme) : CSSProperties {
    return {
        boxSizing: "border-box",
        width: transferOwnershipStyleObject?.width || "max(100%, 360px)",
        height: transferOwnershipStyleObject?.height || "100%",
        border: transferOwnershipStyleObject?.border || "none",
        borderRadius: transferOwnershipStyleObject?.borderRadius || "8px",
        background: transferOwnershipStyleObject?.background || theme.palette.getBackground(),
        display: "flex",
        flexDirection: "column",
    };
}

export function scopeLabelStyle(
    transferOwnershipStyleObject: TransferOwnershipStyle | null,
    theme: CometChatTheme,
    isRadioButton: boolean
): LabelStyle {
    const style: RadioButtonStyle | LabelStyle = {
        height: "14px",
        width: "14px",
        border: "none",
        borderRadius: "4px",
        background: "inherit",
    };

    if (isRadioButton) {
        return new RadioButtonStyle({
            ...style,
            labelTextColor:
                transferOwnershipStyleObject?.MemberScopeTextColor ||
                theme.palette.getAccent600(),
            labelTextFont:
                transferOwnershipStyleObject?.MemberScopeTextFont ||
                fontHelper(theme.typography.text2),
        });
    } else {
        return new LabelStyle({
            ...style,
            textColor:
                transferOwnershipStyleObject?.MemberScopeTextColor ||
                theme.palette.getAccent600(),
            textFont:
                transferOwnershipStyleObject?.MemberScopeTextFont ||
                fontHelper(theme.typography.text2),
        });
    }
}

export function transferBtnStyle(transferOwnershipStyleObject : TransferOwnershipStyle | null, theme : CometChatTheme) : ButtonStyle {
    
    return {
        width: "100%",
        background: theme.palette.getPrimary(),
        padding: "16px",
        buttonTextColor: transferOwnershipStyleObject?.transferButtonTextColor || theme.palette.getAccent900(),
        buttonTextFont: transferOwnershipStyleObject?.transferButtonTextFont || fontHelper(theme.typography.title2),
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        border: "none",
        borderRadius: "8px"
    } as ButtonStyle ;
}

export function btnsWrapperStyle() : CSSProperties {
    return {
        flexShrink: "0",
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        padding: '4px 28px 20px 28px',
        boxSizing: 'border-box'
    };
}

export function cancelBtnStyle(transferOwnershipStyleObject : TransferOwnershipStyle | null, theme : CometChatTheme) : ButtonStyle {
    return {
        width: "100%",
        background: '#f1f1f1',
        padding: "16px",
        color: transferOwnershipStyleObject?.cancelButtonTextColor || theme.palette.getAccent(),
        font: transferOwnershipStyleObject?.cancelButtonTextFont || fontHelper(theme.typography.title2),
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        border: "0 none",
        borderRadius: "8px"
    };
}  

export function avatarStyle(avatarStyleObject : AvatarStyle | null, theme : CometChatTheme) : AvatarStyle {
    return new AvatarStyle({
        borderRadius: avatarStyleObject?.borderRadius || "24px",
        width: avatarStyleObject?.width || "36px",
        height: avatarStyleObject?.height || "36px",
        border: avatarStyleObject?.border || `1px solid ${theme.palette.getAccent100()}`,
        backgroundColor: avatarStyleObject?.backgroundColor || theme.palette.getAccent700(),
        nameTextColor: avatarStyleObject?.nameTextColor || theme.palette.getAccent900(),
        backgroundSize: avatarStyleObject?.backgroundSize || "cover",
        nameTextFont: avatarStyleObject?.nameTextFont || fontHelper(theme.typography.subtitle1),
        outerViewBorderWidth: avatarStyleObject?.outerViewBorderWidth || "0",
        outerViewBorderRadius: avatarStyleObject?.outerViewBorderRadius || "0",
        outerViewBorderColor: avatarStyleObject?.outerViewBorderColor || "",
        outerViewBorderSpacing: avatarStyleObject?.outerViewBorderSpacing || "0"
    });
}

export function statusIndicatorStyle(statusIndicatorStyleObject : CSSProperties | null) : CSSProperties {
    const obj = statusIndicatorStyleObject !== null ? statusIndicatorStyleObject : {};
    
    return {
        ...obj,
        width: statusIndicatorStyleObject?.width || "12px",
        height: statusIndicatorStyleObject?.height || "12px",
        border: statusIndicatorStyleObject?.border || "none",
        borderRadius: statusIndicatorStyleObject?.borderRadius || "24px"
    };
}

export function listItemStyle(listItemStyleObject : ListItemStyle | null, groupMemberStyleObject : GroupMembersStyle | null, theme : CometChatTheme) : ListItemStyle {
    return new ListItemStyle({
        height: listItemStyleObject?.height || "45px",
        width: listItemStyleObject?.width || "100%",
        border: listItemStyleObject?.border || "none",
        borderRadius: listItemStyleObject?.borderRadius || "0",
        background: listItemStyleObject?.background || theme.palette.getBackground(),
        activeBackground: listItemStyleObject?.activeBackground || "",
        hoverBackground: listItemStyleObject?.hoverBackground || "",
        separatorColor: listItemStyleObject?.separatorColor || groupMemberStyleObject?.separatorColor || theme.palette.getAccent200(),
        titleFont: listItemStyleObject?.titleFont || fontHelper(theme.typography.title2),
        titleColor:  listItemStyleObject?.titleColor || theme.palette.getAccent()    
    });
}

export function groupMembersStyle(groupMemberStyleObject : GroupMembersStyle |  null, theme : CometChatTheme) : GroupMembersStyle {
    return new GroupMembersStyle({
        height: groupMemberStyleObject?.height || "100%",
        width: groupMemberStyleObject?.width || "100%",
        border: groupMemberStyleObject?.border || "none",
        borderRadius: groupMemberStyleObject?.borderRadius || "inherit",
        background: groupMemberStyleObject?.background || 'inherit',
        titleTextFont: groupMemberStyleObject?.titleTextFont || fontHelper(theme.typography.title1),
        titleTextColor: groupMemberStyleObject?.titleTextColor || theme.palette.getAccent(),
        emptyStateTextFont: groupMemberStyleObject?.emptyStateTextFont || "",
        emptyStateTextColor: groupMemberStyleObject?.emptyStateTextColor || "",
        errorStateTextFont: groupMemberStyleObject?.errorStateTextFont || "", 
        errorStateTextColor: groupMemberStyleObject?.errorStateTextColor || "", 
        loadingIconTint: groupMemberStyleObject?.loadingIconTint || "",   
        searchIconTint: groupMemberStyleObject?.searchIconTint || "", 
        searchBorder: groupMemberStyleObject?.searchBorder || "", 
        searchBorderRadius: groupMemberStyleObject?.searchBorderRadius || "", 
        searchBackground: groupMemberStyleObject?.searchBackground || "", 
        searchPlaceholderTextFont: groupMemberStyleObject?.searchPlaceholderTextFont || "", 
        searchPlaceholderTextColor: groupMemberStyleObject?.searchPlaceholderTextColor || "", 
        searchTextFont: groupMemberStyleObject?.searchTextFont || "", 
        searchTextColor: groupMemberStyleObject?.searchTextColor || "",
        onlineStatusColor: groupMemberStyleObject?.onlineStatusColor || theme.palette.getSuccess(),
        backButtonIconTint: groupMemberStyleObject?.backButtonIconTint || theme.palette.getPrimary(),
        closeButtonIconTint: groupMemberStyleObject?.closeButtonIconTint || theme.palette.getPrimary(),
        padding: groupMemberStyleObject?.padding || "0",
        separatorColor: groupMemberStyleObject?.separatorColor || theme.palette.getAccent200(),
        boxShadow: groupMemberStyleObject?.boxShadow
    });
}
