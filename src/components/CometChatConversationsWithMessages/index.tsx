import {
  CometChatConversationEvents,
  CometChatGroupEvents,
  CometChatUIEvents,
  CometChatUIKitConstants,
  IGroupLeft,
  IGroupMemberAdded,
  IGroupMemberJoined,
  IGroupMemberKickedBanned,
  IOwnershipChanged,
  localize,
} from "@cometchat/uikit-resources";
import {
  CometChatUIKitUtility,
  WithMessagesStyle,
} from "@cometchat/uikit-shared";
import {
  getBackdropStyle,
  getButtonStyle,
  getConversationsStyle,
  getConversationsWrapperStyles,
  getEmptyMessageLayoutStyle,
  getLabelStyle,
  getMessageComposerStyle,
  getMessageHeaderStyle,
  getMessagesStyle,
  getWithMessagesMainStyle,
  getWithMessagesSidebarStyle,
} from "./style";
import { useCallback, useContext, useRef, useState } from "react";

import CloseIcon from "./assets/close2x.svg";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatContacts } from "../CometChatContacts";
import { CometChatConversations } from "../../cometchat-pro-react-ui-kit/src/CometChatConversations";
import { CometChatMessages } from "../CometChatMessages";
import { CometChatThemeContext } from "../../cometchat-pro-react-ui-kit/src/CometChatThemeContext";
import { Hooks } from "./hooks";
import StartConversationIcon from "./assets/StartConversation.svg";
import { useCometChatErrorHandler, useStateRef } from "../../cometchat-pro-react-ui-kit/src/CometChatCustomHooks";

interface IConversationsWithMessagesProps {
  user?: CometChat.User;
  group?: CometChat.Group;
  isMobileView?: boolean;
  messageText?: string;
  conversationsWithMessagesStyle?: WithMessagesStyle;
  onError?: ((error: CometChat.CometChatException) => void) | null;

  startConversationIconURL?: string;
}

const defaultProps: IConversationsWithMessagesProps = {
  user: undefined,
  group: undefined,
  isMobileView: false,
  messageText: "",
  conversationsWithMessagesStyle: {},

  onError: (error: CometChat.CometChatException) => {
    console.log(error);
  },

  startConversationIconURL: StartConversationIcon,
};

const CometChatConversationsWithMessages = (
  props: IConversationsWithMessagesProps
) => {
  const { theme } = useContext(CometChatThemeContext);
  const {
    user,
    group,
    isMobileView,
    messageText,
    conversationsWithMessagesStyle,

    onError,
    startConversationIconURL,
  } = props;

  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(null);
  const [activeConversation, setActiveConversation] =
    useState<CometChat.Conversation | null>(null);
  const [activeUser, setActiveUser] = useState(user ?? null);
  const [activeGroup, setActiveGroup] = useState(group ?? null);
  const [showCometChatContacts, setShowCometChatContacts] = useState(false);
  const activeChatRef = useRef<CometChat.Conversation | null>(null);
  const onErrorCallback = useCometChatErrorHandler(onError);
  activeChatRef.current = activeConversation
  const [startConversationBtnElement, setStartConversationBtnRef] = useStateRef<
    JSX.IntrinsicElements["cometchat-button"] | null
  >(null);

  const setActiveChat = useCallback(async () => {
    try {
      let type: string = activeUser
        ? CometChatUIKitConstants.MessageReceiverType.user
        : CometChatUIKitConstants.MessageReceiverType.group;
      let conversationWith: string | undefined = activeUser
        ? activeUser?.getUid()
        : activeGroup?.getGuid();
      if (typeof conversationWith === "string") {
        setActiveConversation(
          await CometChat.getConversation(conversationWith, type)
        );
      }
    } catch (error: any) {
      onErrorCallback(error);
    }
  }, [activeUser, activeGroup, setActiveConversation, onErrorCallback]);

  const onBack = () => {
    setActiveUser(null);
    setActiveGroup(null);
    setActiveConversation(null);
  };

  const onItemClick = (conversation: CometChat.Conversation) => {
    try {
      activeChatRef.current = conversation
      setActiveConversation(conversation);
      if (
        conversation.getConversationType() &&
        conversation.getConversationType() ===
        CometChatUIKitConstants.MessageReceiverType.user
      ) {
        setActiveGroup(null);
        setActiveUser(conversation.getConversationWith() as CometChat.User);
      } else if (
        conversation.getConversationType() &&
        conversation.getConversationType() ===
        CometChatUIKitConstants.MessageReceiverType.group
      ) {
        setActiveUser(null);
        setActiveGroup(conversation.getConversationWith() as CometChat.Group);
      } else {
        return;
      }
    } catch (error: any) {
      onErrorCallback(error);
    }
  };
  const removeChatOnGroupAction = useCallback((message: CometChat.Action, leavingUser: CometChat.User, user?: CometChat.User) => {
    const activeChat = activeChatRef.current
    const currentuser = loggedInUser || user
    const isSameUser = currentuser?.getUid() === leavingUser.getUid();
    const actionForGroup = message.getActionFor() instanceof CometChat.Group;

    if (isSameUser && activeChat && activeChat.getConversationWith() instanceof CometChat.Group) {
      let group = activeChat.getConversationWith() as CometChat.Group;

      if (actionForGroup) {
        let actionOnGroup = message.getActionFor() as CometChat.Group;

        if (actionOnGroup.getGuid() === group.getGuid()) {
          setActiveConversation(null);
          setActiveGroup(null);
          setActiveUser(null)
        }
      }
    }
  }, [loggedInUser, setLoggedInUser, activeUser, activeGroup, activeChatRef])
  const attachGroupListener = (user?: CometChat.User) => {
    const listenerId = "ConversationWithMessages_Group_" + String(Date.now());
    CometChat.addGroupListener(
      listenerId,
      new CometChat.GroupListener({
        onGroupMemberKicked: (message: CometChat.Action, kickedUser: CometChat.User) => {
          removeChatOnGroupAction(message, kickedUser, user);

        },
        onGroupMemberBanned: (message: CometChat.Action, bannedUser: CometChat.User) => {
          removeChatOnGroupAction(message, bannedUser, user);

        },
      })
    );
    return () => CometChat.removeGroupListener(listenerId);
  }

  const removeActiveChatList = useCallback(
    (conversation: CometChat.Conversation) => {
      try {
        const conversationType = conversation.getConversationType();
        const conversationWith = conversation.getConversationWith();
        if (
          conversationType ===
          CometChatUIKitConstants.MessageReceiverType.user &&
          activeUser &&
          activeUser.getUid() === (conversationWith as CometChat.User).getUid()
        ) {
          setActiveUser(null);
        } else if (
          conversationType ===
          CometChatUIKitConstants.MessageReceiverType.group &&
          activeGroup &&
          activeGroup.getGuid() ===
          (conversationWith as CometChat.Group).getGuid()
        ) {
          setActiveGroup(null);
        } else {
          return;
        }
      } catch (error: any) {
        onErrorCallback(error);
      }
    },
    [activeGroup, setActiveGroup, activeUser, setActiveUser, onErrorCallback]
  );

  const subscribeToEvents = useCallback(() => {
    try {
      const ccConversationDeleted =
        CometChatConversationEvents.ccConversationDeleted.subscribe(
          (conversation: CometChat.Conversation) => {
            removeActiveChatList(conversation);
          }
        );
      const ccGroupDeleted = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (group: CometChat.Group) => {
          if (activeGroup && activeGroup.getGuid() === group.getGuid()) {
            setActiveConversation(null);
            setActiveGroup(null);
          }
        }
      );
      const ccGroupMemberAdded =
        CometChatGroupEvents.ccGroupMemberAdded.subscribe(
          (item: IGroupMemberAdded) => {
            if (
              activeGroup &&
              activeGroup.getGuid() === item?.userAddedIn!.getGuid()
            ) {
              setActiveGroup(item?.userAddedIn);
            }
          }
        );
      const ccGroupMemberBanned =
        CometChatGroupEvents.ccGroupMemberBanned.subscribe(
          (item: IGroupMemberKickedBanned) => {
            if (
              activeGroup &&
              activeGroup.getGuid() === item?.kickedFrom!.getGuid()
            ) {
              setActiveGroup(item?.kickedFrom);
            }
          }
        );
      const ccGroupMemberJoined =
        CometChatGroupEvents.ccGroupMemberJoined.subscribe(
          (item: IGroupMemberJoined) => {
            if (
              activeGroup &&
              activeGroup.getGuid() === item?.joinedGroup!.getGuid()
            ) {
              setActiveGroup(item?.joinedGroup);
            }
          }
        );
      const ccGroupMemberKicked =
        CometChatGroupEvents.ccGroupMemberKicked.subscribe(
          (item: IGroupMemberKickedBanned) => {
            if (
              activeGroup &&
              activeGroup.getGuid() === item?.kickedFrom!.getGuid()
            ) {
              setActiveGroup(item?.kickedFrom);
            }
          }
        );
      const ccOwnershipChanged =
        CometChatGroupEvents.ccOwnershipChanged.subscribe(
          (item: IOwnershipChanged) => {
            if (
              activeGroup &&
              activeGroup.getGuid() === item?.group!.getGuid()
            ) {
              setActiveGroup(item?.group);
              setActiveConversation((prevState) => {
                if (prevState) {
                  let tempConversation: CometChat.Conversation =
                    CometChatUIKitUtility.clone(prevState);
                  tempConversation.setConversationWith(item?.group);
                  return tempConversation;
                }
                return prevState;
              });
            }
          }
        );
      const ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (
            activeGroup &&
            activeGroup.getGuid() === item?.leftGroup!.getGuid() &&
            loggedInUser?.getUid() === item?.userLeft?.getUid()
          ) {
            setActiveGroup(null);
            setActiveConversation(null);
          }
        }
      );

      const ccOpenChat = CometChatUIEvents.ccOpenChat.subscribe((item) => {
        const uid = item.user?.getUid()
        if (uid) {
          CometChat.getConversation(uid, CometChatUIKitConstants.MessageReceiverType.user).then((conversation) => {
            onItemClick(conversation);
          })
        }
      })

      return () => {
        try {
          ccConversationDeleted?.unsubscribe();
          ccGroupDeleted?.unsubscribe();
          ccGroupMemberAdded?.unsubscribe();
          ccGroupMemberBanned?.unsubscribe();
          ccGroupMemberJoined?.unsubscribe();
          ccGroupMemberKicked?.unsubscribe();
          ccOwnershipChanged?.unsubscribe();
          ccGroupLeft?.unsubscribe();
          ccOpenChat?.unsubscribe();
        } catch (error: any) {
          onErrorCallback(error);
        }
      };
    } catch (error: any) {
      onErrorCallback(error);
    }
  }, [
    activeGroup,
    setActiveConversation,
    setActiveGroup,
    removeActiveChatList,
    onErrorCallback,
    loggedInUser,
  ]);

  const showCometChatContactsView = () => setShowCometChatContacts(true);
  const hideCometChatContactsView = () => setShowCometChatContacts(false);

  const StartConversationButton = !showCometChatContacts ? (
    <cometchat-button
      ref={setStartConversationBtnRef}
      iconURL={startConversationIconURL}
      buttonStyle={JSON.stringify(getButtonStyle(showCometChatContacts, theme))}
    >
      {" "}
    </cometchat-button>
  ) : null;

  const onContactsItemClick = (
    user?: CometChat.User,
    group?: CometChat.Group
  ) => {
    if (user) {
      setActiveGroup(null);
      setActiveUser(user);
      hideCometChatContactsView();
    } else if (group) {
      setActiveUser(null);
      setActiveGroup(group);
      hideCometChatContactsView();
    }
  };



  const getConversationsComponent = () => {
    return (
      <CometChatConversations
        activeConversation={activeConversation ?? undefined}
        onItemClick={onItemClick}
        conversationsStyle={getConversationsStyle()}



        menus={StartConversationButton!}


        backdropStyle={getBackdropStyle(
          conversationsWithMessagesStyle)}

      />
    );
  };

  const getSidebarContent = () => {
    return (
      <div
        className="cc-conversations-with-messages__sidebar"
        style={getWithMessagesSidebarStyle(
          conversationsWithMessagesStyle,
          theme,
          isMobileView,
          activeUser,
          activeGroup
        )}
      >
        {getConversationsComponent()}
      </div>
    );
  };

  const getMessagesComponent = () => {
    return (
      <CometChatMessages
        user={activeUser ?? undefined}
        group={activeGroup ?? undefined}

        messagesStyle={getMessagesStyle(undefined, conversationsWithMessagesStyle)}




      />
    );
  };

  const getMainContent = () => {
    return !showCometChatContacts && (activeUser || activeGroup) ? (
      <div
        className="cc-conversations-with-messages__main"
        style={getWithMessagesMainStyle(
          conversationsWithMessagesStyle,
          isMobileView,
          activeUser,
          activeGroup
        )}
      >
        {getMessagesComponent()}
      </div>
    ) : null;
  };

  const getDecoratorMessageContent = () => {

    const text = messageText ? messageText : localize("NO_CHATS_SELECTED");

    return (
      <div
        className="cc-decorator-message--empty"
        style={getEmptyMessageLayoutStyle(
          isMobileView,
          activeUser,
          activeGroup
        )}
      >
        <cometchat-label
          text={text}
          labelStyle={JSON.stringify(
            getLabelStyle(conversationsWithMessagesStyle, theme)
          )}
        ></cometchat-label>
      </div>
    );
  };

  const getDecoratorMessage = () =>
    !showCometChatContacts && !activeUser && !activeGroup
      ? getDecoratorMessageContent()
      : null;

  const getContacts = () =>
    showCometChatContacts && (
      <CometChatContacts
        title={localize("NEW_CHAT")}
        usersTabTitle={localize("USERS")}
        groupsTabTitle={localize("GROUPS")}
        closeIconURL={
          CloseIcon
        }
        onItemClick={onContactsItemClick}
        onClose={
          hideCometChatContactsView
        }


      //hideSubmitButton={true} -- to be added later
      />
    );

  Hooks(
    loggedInUser,
    setLoggedInUser,
    subscribeToEvents,
    onErrorCallback,
    setActiveChat,
    user,
    group,
    startConversationBtnElement,
    showCometChatContactsView,
    showCometChatContacts,
    hideCometChatContactsView,
    setActiveUser,
    setActiveGroup,
    attachGroupListener
  );

  return (
    <div
      className="cc-conversations-with-messages__wrapper"
      style={getConversationsWrapperStyles(
        conversationsWithMessagesStyle,
        theme
      )}
    >
      {getSidebarContent()}
      {getMainContent()}
      {getDecoratorMessage()}
      {getContacts()}
    </div>
  );
};

CometChatConversationsWithMessages.defaultProps = defaultProps;
export { CometChatConversationsWithMessages };
