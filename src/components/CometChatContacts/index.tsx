import {
  BaseStyle,
  ContactsStyle,
  TabItemStyle
} from "@cometchat/uikit-shared";
import {
  CometChatTabItem,
  CometChatTheme,
  SelectionMode,
  TabAlignment,
  TabsVisibility,
  fontHelper,
  localize,
} from "@cometchat/uikit-resources";
import {
  closeBtnStyle,
  contactsContentStyle,
  contactsHeaderStyle,
  getContactsStyle,
  contactsWrapperStyle,
  getTabsStyle,
  getTabItemStyling,
  submitBtnStyle,
  submitBtnWrapperStyle,
} from "./style";

import CloseIcon from "./assets/close2x.svg";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatButton } from "../../cometchat-pro-react-ui-kit/src/Shared/Views/CometChatButton";
import { CometChatGroups } from "../../cometchat-pro-react-ui-kit/src/CometChatGroups";
import { CometChatTabs } from "../../cometchat-pro-react-ui-kit/src/Shared/Views/CometChatTabs/index";
import { CometChatThemeContext } from "../../cometchat-pro-react-ui-kit/src/CometChatThemeContext";
import { CometChatUsers } from "../../cometchat-pro-react-ui-kit/src/CometChatUsers";
import { useContext, useRef } from "react";
import React from "react";

interface ContactsProps {
  title?: string;
  usersTabTitle?: string;
  groupsTabTitle?: string;
  onSubmitButtonClick?: (users?: CometChat.User[], groups?: CometChat.Group[]) => void,
  closeIconURL?: string;
  onClose?: () => void;
  onItemClick?: (user?: CometChat.User, group?: CometChat.Group) => void;
  onError: ((error: CometChat.CometChatException) => void) | null;
  submitButtonText?: string,
  hideSubmitButton?: boolean,
  selectionLimit?: number,
  tabVisibility?: TabsVisibility;
  contactsStyle: ContactsStyle;
  selectionMode?: SelectionMode;
}

const defaultProps: ContactsProps = {
  title: localize("NEW_CHAT"),
  usersTabTitle: localize("USERS"),
  groupsTabTitle: localize("GROUPS"),
  onError: (error: CometChat.CometChatException) => {
    console.log(error);
  },
  tabVisibility: TabsVisibility.usersAndGroups,
  contactsStyle: {},
  selectionLimit: 5,
  hideSubmitButton: true,
  submitButtonText: "Submit",
  selectionMode: SelectionMode.none
};

const CometChatContacts = (props: ContactsProps) => {
  const [tabs, setTabs] = React.useState<CometChatTabItem[]>([]);
  const groupsListRef = useRef<CometChat.Group[]>([]);
  const usersListRef = useRef<CometChat.User[]>([]);
  const [isActiveUsersTab, setIsActiveUsersTab] = React.useState<boolean>(true);
  const [isLimitReached, setIsLimitReached] = React.useState<boolean>(true);
  const [isActiveGroupsTab, setIsActiveGroupsTab] = React.useState<boolean>(false);
  const usersTabRef = React.useRef<CometChatTabItem>();
  const groupsTabRef = React.useRef<CometChatTabItem>();
  const { theme } = useContext(CometChatThemeContext);
  const {
    title,
    usersTabTitle,
    groupsTabTitle,
    closeIconURL,
    onClose,
    onItemClick,
    tabVisibility,
    contactsStyle,
    selectionLimit,
    hideSubmitButton,
    submitButtonText,
    selectionMode,
    onSubmitButtonClick
  } = props;

  React.useEffect(() => {

    const usersRequestBuilder = new CometChat.UsersRequestBuilder()
      .setLimit(30)
      .hideBlockedUsers(true);
    const usersSearchRequestBuilder = new CometChat.UsersRequestBuilder()
      .setLimit(30)
      .hideBlockedUsers(true);

    const groupsRequestBuilder = new CometChat.GroupsRequestBuilder()
      .setLimit(30)
      .joinedOnly(true);
    const groupsSearchRequestBuilder = new CometChat.GroupsRequestBuilder()
      .setLimit(30)
      .joinedOnly(true);

    usersTabRef.current = new CometChatTabItem({
      id: "users",
      title: usersTabTitle,
      style: getTabItemStyling(contactsStyle, theme, tabVisibility, isActiveUsersTab),
      childView: (
        // <div style={{marginTop: "50px"}}>
        <CometChatUsers
          title=""
          activeUser={undefined}
          hideSearch={false}

          searchRequestBuilder={
            usersSearchRequestBuilder
          }
          onItemClick={onUserClicked}

          usersRequestBuilder={
            usersRequestBuilder
          }

          onSelect={onUserSelected}

          selectionMode={selectionMode}

        />
        // </div>
      ),
      isActive: isActiveUsersTab,
    });

    groupsTabRef.current = new CometChatTabItem({
      id: "groups",
      title: groupsTabTitle,
      style: getTabItemStyling(contactsStyle, theme, tabVisibility, isActiveGroupsTab),
      childView: (
        <CometChatGroups
          title=""
          activeGroup={undefined}
          hideSearch={false}

          searchRequestBuilder={

            groupsSearchRequestBuilder
          }
          onItemClick={onGroupClicked}


          groupsRequestBuilder={
            groupsRequestBuilder
          }

          onSelect={onGroupSelected}


          selectionMode={selectionMode}

        />
      ),
      isActive: isActiveGroupsTab,
    });

    setTabs([usersTabRef.current, groupsTabRef.current]);

  }, []);

  React.useEffect(() => {

    if (tabVisibility === TabsVisibility.groups) {
      setIsActiveGroupsTab(true);
      setIsActiveUsersTab(false);
      setTabs([groupsTabRef.current!]);
    } else if (tabVisibility === TabsVisibility.users) {
      setIsActiveGroupsTab(false);
      setIsActiveUsersTab(true);
      setTabs([usersTabRef.current!]);
    } else if (tabVisibility === TabsVisibility.usersAndGroups) {
      setIsActiveGroupsTab(false);
      setIsActiveUsersTab(true);
      setTabs([usersTabRef.current!, groupsTabRef.current!]);
    }

  }, [tabVisibility])

  const onUserClicked = (user: CometChat.User) => {
    if (onItemClick) {
      onItemClick(user, undefined);
    }
  };

  const onGroupClicked = (group: CometChat.Group) => {
    if (onItemClick) {
      onItemClick(undefined, group);
    }
  };

  const submitClicked = () => {
    if (onSubmitButtonClick) {
      onSubmitButtonClick(usersListRef.current, groupsListRef.current);
    }
  };


  const onGroupSelected = (group: CometChat.Group) => {
    var key = groupsListRef.current.findIndex((m: any) => m?.getGuid() === group.getGuid());
    if (key >= 0) {
      groupsListRef.current.splice(key, 1);
    } else {
      groupsListRef.current.push(group);
    }
    setIsLimitReached((usersListRef.current.length + groupsListRef.current.length) > selectionLimit!)

  };
  const onUserSelected = (user: CometChat.User) => {
    var key = usersListRef.current.findIndex((m: any) => m?.getUid() === user.getUid());
    if (key >= 0) {
      usersListRef.current.splice(key, 1);
    } else {
      usersListRef.current.push(user);
    }

    setIsLimitReached((usersListRef.current.length + groupsListRef.current.length) > selectionLimit!)
  };


  function getCloseBtnView() {
    if (closeIconURL === "") return <></>;
    return (
      <CometChatButton
        iconURL={closeIconURL}
        hoverText={localize("CLOSE")}
        buttonStyle={closeBtnStyle(contactsStyle, theme)}
        onClick={onClose}
      />
    );
  }
  function submitBtnView() {
    if ((selectionMode === SelectionMode.none && hideSubmitButton)) return <></>;
    return (
      <div className="cc-contacts__submit--buttons" style={submitBtnWrapperStyle()}>
        <CometChatButton
          text={submitButtonText}
          buttonStyle={submitBtnStyle(contactsStyle, theme)}
          disabled={isLimitReached}
          onClick={submitClicked}
        />
      </div>
    );
  }

  return tabs.length ? (
    <div className="cc-contacts-wrapper" style={contactsWrapperStyle(contactsStyle, theme)}>
      <div className="cc-contacts" style={getContactsStyle(contactsStyle, theme)}>
        <div className="cc-contacts-header" style={contactsHeaderStyle(contactsStyle, theme)}>{title}</div>
        <div className="cc-contacts-content" style={contactsContentStyle()}>
          <CometChatTabs
            tabAlignment={TabAlignment.right}
            tabs={tabs}
            tabsStyle={getTabsStyle(contactsStyle, theme)}
            // isDraggable={false}
            keepAlive={true}
          />
          {getCloseBtnView()}
        </div>
        {submitBtnView()}
      </div>
    </div>
  ) : <></>;
};

CometChatContacts.defaultProps = defaultProps;
export { CometChatContacts };
