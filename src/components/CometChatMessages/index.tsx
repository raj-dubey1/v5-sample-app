import "@cometchat/uikit-elements";

import {
  CometChatGroupEvents,
  CometChatMessageEvents,
  CometChatUIEvents,
  CometChatUserEvents,
  IGroupLeft,
  PanelAlignment,
} from "@cometchat/uikit-resources";
import {

  MessagesStyle,

} from "@cometchat/uikit-shared";
import {
  MessagesComposerDivStyle,
  MessagesDetailsDivStyle,
  MessagesDivStyle,
  MessagesHeaderDivStyle,
  MessagesListDivStyle,
  MessagesWrapperStyle,
  ThreadedMessagesDivStyle,
  detailsButtonStyle,

  getMessageComposerStyle,
  getMessageHeaderStyle,
  getMessageListStyle,
  liveReactionStyle,
  panelDivStyle,
} from "./style";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { ChatConfigurator } from "../../cometchat-pro-react-ui-kit/src/Shared/Framework/ChatConfigurator";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatDetails } from "../CometChatDetails";
import { CometChatMessageComposer } from "../../cometchat-pro-react-ui-kit/src/CometChatMessageComposer";
import { CometChatMessageHeader } from "../../cometchat-pro-react-ui-kit/src/CometChatMessageHeader";
import { CometChatMessageList } from "../../cometchat-pro-react-ui-kit/src/CometChatMessageList/CometChatMessageList";
import { CometChatThemeContext } from "../../cometchat-pro-react-ui-kit/src/CometChatThemeContext";
import { CometChatThreadedMessages } from "../CometChatThreadedMessages";
import { Hooks } from "./hooks";
import InfoIcon from "./assets/Info.svg";
import LiveReactionIcon from "./assets/heart-reaction.png";

interface IMessagesProps {
  user?: CometChat.User;
  group?: CometChat.Group;
  hideMessageComposer?: boolean;
  disableTyping?: boolean;
  customSoundForIncomingMessages?: string;
  customSoundForOutgoingMessages?: string;
  disableSoundForMessages?: boolean;
  messagesStyle?: MessagesStyle;
  messageHeaderView?: any;
  messageComposerView?: any;
  messageListView?: any;
  hideMessageHeader?: boolean;
  hideDetails?: boolean;
  auxiliaryMenu?: any;
}

const defaultProps: IMessagesProps = {
  user: undefined,
  group: undefined,
  hideMessageComposer: false,
  disableTyping: false,
  customSoundForIncomingMessages: "",
  customSoundForOutgoingMessages: "",
  disableSoundForMessages: false,
  messagesStyle: new MessagesStyle({
    width: "100%",
    height: "100%",
    background: "white",
    borderRadius: "none",
    border: "1px solid rgba(20, 20, 20, 0.1)"
  }),
  messageHeaderView: null,
  messageComposerView: null,
  messageListView: null,
  hideMessageHeader: false,
  hideDetails: false,
  auxiliaryMenu: null,
};



const CometChatMessages = (props: IMessagesProps) => {
  const { theme } = useContext(CometChatThemeContext);

  const {
    user,
    group,
    hideMessageComposer,
    disableTyping,

    customSoundForIncomingMessages,
    customSoundForOutgoingMessages,
    disableSoundForMessages,
    messagesStyle,
    messageHeaderView,
    messageComposerView,
    messageListView,
    hideMessageHeader,
    hideDetails,
    auxiliaryMenu,
  } = props;
  const liveReactionName = "heart";
  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(null);

  const [activeUser, setActiveUser] = useState(user);
  const [activeGroup, setActiveGroup] = useState(group);

  const ccHeaderMenuRef = useRef(null);
  const threadMessageObjectRef = useRef<CometChat.BaseMessage | null>(null);
  const parentBubbleViewCallbackRef = useRef<Function | null>(null);

  const [liveReaction, setLiveReaction] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openThreadedMessages, setOpenThreadedMessages] = useState(false);

  const [showPanelView, setShowPanelView] = useState(false);
  const assistBotChatView = useRef(null);

  let messagesRequestBuilder = useMemo(() => {
    if (user) {
      return new CometChat.MessagesRequestBuilder()
        .setUID(user.getUid())
        .setCategories(
          ChatConfigurator.getDataSource().getAllMessageCategories()
        )
        .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
        .setLimit(20)
        .hideReplies(true);
    } else if (group) {
      return new CometChat.MessagesRequestBuilder()
        .setGUID(group.getGuid())
        .setCategories(
          ChatConfigurator.getDataSource().getAllMessageCategories()
        )
        .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
        .setLimit(20)
        .hideReplies(true);
    }
  }, [user, group]);

  let reactionName: string = LiveReactionIcon,
    infoIconURL: string = InfoIcon;

  const liveReactionStart = useCallback(
    (reactionName: string) => {
      if (liveReaction) {
        reactionName = "";
        setLiveReaction(false);
      } else {
        setLiveReaction(true);
        setTimeout(() => {
          reactionName = "";
          setLiveReaction(false);
        }, 1500);
      }
    },
    [liveReaction, setLiveReaction]
  );

  const subscribeToEvents = useCallback(() => {
    try {

      const ccLiveReaction = CometChatMessageEvents.ccLiveReaction.subscribe(
        (reactionName: any) => {
          if (!openThreadedMessages && reactionName && reactionName === liveReactionName) {
            liveReactionStart(reactionName);
          }
        }
      );
      const ccGroupDeleted = CometChatGroupEvents.ccGroupDeleted.subscribe(
        (value: CometChat.Group) => {
          if (activeGroup && activeGroup.getGuid() === group?.getGuid()) {
            setOpenDetails(false);
            setOpenThreadedMessages(false);
            setActiveGroup(value);
          }
        }
      );
      const ccGroupLeft = CometChatGroupEvents.ccGroupLeft.subscribe(
        (item: IGroupLeft) => {
          if (activeGroup?.getGuid() === item.leftGroup.getGuid()) {
            if (loggedInUser?.getUid() === item?.userLeft.getUid()) {
              setOpenDetails(false);
              setOpenThreadedMessages(false);
            }
            setActiveGroup(item.leftGroup);
          }
        }
      );
      const ccUserBlocked = CometChatUserEvents.ccUserBlocked.subscribe(
        (blockedUser: CometChat.User) => {
          if (activeUser?.getUid() === blockedUser.getUid()) {
            blockedUser.setBlockedByMe(true);
            setActiveUser(blockedUser);
          }
        }
      );
      const ccUserUnBlocked = CometChatUserEvents.ccUserUnblocked.subscribe(
        (unblockedUser: CometChat.User) => {
          if (activeUser?.getUid() === unblockedUser.getUid()) {
            unblockedUser.setBlockedByMe(false);
            setActiveUser(unblockedUser);
          }
        }
      );

      const ccShowPanel = CometChatUIEvents.ccShowPanel.subscribe((data) => {
        if (data.position === PanelAlignment.messages) {
          assistBotChatView.current = data.child;
          setShowPanelView(true);
        }
      });

      const ccHidePanel = CometChatUIEvents.ccHidePanel.subscribe(
        (alignment) => {
          if (alignment === PanelAlignment.messages) {
            assistBotChatView.current = null;
            setShowPanelView(false);
          }
        }
      );

      return () => {
        try {
          ccLiveReaction?.unsubscribe();
          ccGroupDeleted?.unsubscribe();
          ccGroupLeft?.unsubscribe();
          ccUserBlocked?.unsubscribe();
          ccUserUnBlocked?.unsubscribe();
          ccShowPanel?.unsubscribe();
          ccHidePanel?.unsubscribe();
        } catch (error: any) {
          console.log("error", error);
        }
      };
    } catch (error: any) {
      console.log("error", error);
    }
  }, [
    openThreadedMessages,
    liveReactionStart,
    setOpenDetails,
    setOpenThreadedMessages,
    activeGroup,
    activeUser,
    loggedInUser,
    group,
  ]);

  const openThreadView = (
    message: CometChat.BaseMessage,
    callback: Function
  ) => {
    threadMessageObjectRef.current = message;
    parentBubbleViewCallbackRef.current = callback;
    setOpenThreadedMessages(true);
  };

  const openDetailsPage = () => setOpenDetails(true);
  const closeDetailsPage = () => {
    setOpenDetails(false);
  };

  const closeThreadView = () => {
    threadMessageObjectRef.current = null;
    parentBubbleViewCallbackRef.current = null;
    setOpenThreadedMessages(false);
  };


  const getHeaderMenu = useCallback(() => {

    const defaultAuxiliaryMenu =
      ChatConfigurator.getDataSource().getAuxiliaryHeaderMenu(
        activeUser,
        activeGroup
      );
    return (
      <>
        {auxiliaryMenu
          ? auxiliaryMenu
          : defaultAuxiliaryMenu.map((auxMenu: any) => auxMenu)}
        {!hideDetails ? (
          <div
            className='cc-messages__header-menu-wrapper'
            style={{
              height: "100%",
              width: "100%",
              border: "none",
              background: "transparent",
              borderRadius: 0,
              marginLeft: "16px",
            }}
          >
            <cometchat-button
              iconURL={infoIconURL}
              buttonStyle={JSON.stringify(detailsButtonStyle(theme))}
              ref={ccHeaderMenuRef}
              onClick={openDetailsPage}
            ></cometchat-button>
          </div>
        ) : null}
      </>
    );
  }, [
    activeUser,
    activeGroup,
    auxiliaryMenu,
    hideDetails,
    infoIconURL,
  ]);

  const getMessageHeaderComponent = () => {
    return (
      <CometChatMessageHeader
        user={activeUser}
        group={activeGroup}


        menu={getHeaderMenu()}

        messageHeaderStyle={getMessageHeaderStyle()}


        disableTyping={disableTyping}
      />
    );
  };

  const getMessageHeader = () => {
    if (hideMessageHeader) {
      return null;
    }

    return (
      <div className='cc-messages__header' style={MessagesHeaderDivStyle}>
        {messageHeaderView ? messageHeaderView : getMessageHeaderComponent()}
      </div>
    );
  };

  const getMessageListComponent = () => {
    return (
      <CometChatMessageList
        user={activeUser}
        group={activeGroup}

        disableSoundForMessages={disableSoundForMessages}
        customSoundForMessages={customSoundForIncomingMessages}


        onThreadRepliesClick={
          openThreadView
        }

        messageListStyle={getMessageListStyle()}
      />
    );
  };

  const getMessageList = () => {
    if (messageListView) {
      return messageListView;
    }

    return (
      <div className='cc-messages__list' style={MessagesListDivStyle}>
        {getMessageListComponent()}
      </div>
    );
  };

  const getMessageComposerComponent = () => {
    return (
      !hideMessageComposer ?
        <CometChatMessageComposer

          user={activeUser}
          group={activeGroup}

          messageComposerStyle={getMessageComposerStyle(

          )}

          disableSoundForMessages={disableSoundForMessages}
          customSoundForMessage={customSoundForOutgoingMessages}


          textFormatters={
            []
          }

        /> : null
    )
  };

  const getMessageComposer = () => {
    if (hideMessageComposer) {
      return null;
    }

    if (messageComposerView) {
      return messageComposerView;
    }

    return (
      <div
        className='cc-messages__composer'
        style={MessagesComposerDivStyle(theme)}
      >
        {getMessageComposerComponent()}
      </div>
    );
  };

  const getThreadedMessagesComponent = () => {
    if (openThreadedMessages && threadMessageObjectRef.current) {
      return (
        <CometChatThreadedMessages
          parentMessage={threadMessageObjectRef.current}
          onClose={closeThreadView}

          bubbleView={

            parentBubbleViewCallbackRef.current
          }



        />
      );
    }

    return null;
  };

  const getThreadedMessages = () => {
    if (openThreadedMessages && threadMessageObjectRef.current) {
      return (
        <div className='cc-messages__threaded' style={ThreadedMessagesDivStyle}>
          {getThreadedMessagesComponent()}
        </div>
      );
    }
    return null;
  };

  const getLiveReaction = () => {
    return liveReaction ? (
      <div className='cc-messages__live-reaction' style={liveReactionStyle()}>
        <cometchat-live-reaction
          reactionIconURL={reactionName}
        ></cometchat-live-reaction>
      </div>
    ) : null;
  };

  const getDetailsComponent = () => {
    return (
      <CometChatDetails
        user={activeUser}
        group={activeGroup}




        onClose={closeDetailsPage}



      />
    );
  };

  const getDetails = () => {
    return openDetails ? (
      <div className='cc-messages__details' style={MessagesDetailsDivStyle}>
        {getDetailsComponent()}
      </div>
    ) : null;
  };

  Hooks(
    loggedInUser,
    setLoggedInUser,
    subscribeToEvents,
    ccHeaderMenuRef,
    setOpenDetails,
    user ?? null,
    setActiveUser,
    group ?? null,
    setActiveGroup,
    setOpenThreadedMessages
  );

  if (!activeUser && !activeGroup) {
    return null;
  }

  return (
    <div
      className='cc-messages-wrapper'
      style={MessagesWrapperStyle(messagesStyle, theme)}
    >
      {showPanelView && assistBotChatView.current ? (
        <div className='cc-messages-wrapper__panel' style={panelDivStyle}>
          {assistBotChatView.current}{" "}
        </div>
      ) : null}
      <div className='cc-messages' style={MessagesDivStyle()}>
        {getMessageHeader()}
        {getMessageList()}
        {getMessageComposer()}
      </div>
      {getThreadedMessages()}
      {getLiveReaction()}
      {getDetails()}
    </div>
  );
};

CometChatMessages.defaultProps = defaultProps;
export { CometChatMessages };
