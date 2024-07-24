import "@cometchat/uikit-elements";

import {
  CometChatMessageEvents,
  CometChatUIKitConstants,
  IMessages,
  MessageStatus,
  fontHelper,
  localize,
} from "@cometchat/uikit-resources";
import {
  CometChatUIKitUtility,
  ThreadedMessagesStyle,

} from "@cometchat/uikit-shared";
import {
  ThreadedMessagesActionViewStyle,
  ThreadedMessagesBubbleViewStyle,
  ThreadedMessagesCloseButtonStyle,
  ThreadedMessagesComposerStyle,
  ThreadedMessagesHeaderStyle,
  ThreadedMessagesListStyle,
  ThreadedMessagesTitleStyle,
  ThreadedMessagesWrapperStyle,
  actionButtonStyle,
  threadedMessageListStyle,
} from "./style";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { ChatConfigurator } from "../../cometchat-pro-react-ui-kit/src/Shared/Framework/ChatConfigurator";
import Close2xIcon from "./assets/close2x.svg";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatMessageComposer } from "../../cometchat-pro-react-ui-kit/src/CometChatMessageComposer";
import { CometChatMessageList } from "../../cometchat-pro-react-ui-kit/src/CometChatMessageList/CometChatMessageList";
import { CometChatThemeContext } from "../../cometchat-pro-react-ui-kit/src/CometChatThemeContext";
import { Hooks } from "./hooks";
import { useCometChatErrorHandler } from "../../cometchat-pro-react-ui-kit/src/CometChatCustomHooks";

interface IThreadedMessagesProps {
  parentMessage: CometChat.BaseMessage;
  title?: string;
  closeIconURL?: string;
  bubbleView: any;
  messageActionView?: any;
  onClose?: any;
  onError?: ((error: CometChat.CometChatException) => void) | null;
  threadedMessagesStyle?: any;

  hideMessageComposer?: boolean,
  messageComposerView?: (user?: CometChat.User, group?: CometChat.Group, parentMessage?: CometChat.BaseMessage) => JSX.Element,
  messageListView?: (user?: CometChat.User, group?: CometChat.Group, parentMessage?: CometChat.BaseMessage) => JSX.Element,
}

const threadMessagesStyle = {
  width: "100%",
  height: "100%",
  background: "white",
  borderRadius: "none",
  border: "1px solid rgba(20, 20, 20, 0.1)",
  titleColor: "rgba(20, 20, 20)",
  titleFont: "700 22px Inter",
  closeIconTint: "#3399FF",
};

const titleStyle: any = {
  textFont: "700 22px Inter",
  textColor: "black",
  background: "transparent",
};
const buttonStyle: any = {
  height: "24px",
  width: "24px",
  border: "none",
  borderRadius: "0",
  background: "transparent",
  buttonIconTint: "#7dbfff",
};

const CometChatThreadedMessages = (props: IThreadedMessagesProps) => {
  const {
    parentMessage,
    title = localize("THREAD"),
    closeIconURL = Close2xIcon,
    bubbleView = null,
    messageActionView = null,
    onError,
    onClose = () => { },
    threadedMessagesStyle = threadMessagesStyle,

    messageComposerView,
    messageListView,
    hideMessageComposer
  } = props;

  const { theme } = useContext(CometChatThemeContext);

  const [parentMessageObject, setParentMessageObject] =
    useState<CometChat.BaseMessage>(parentMessage);
  const [replyCount, setReplyCount] = useState(0);

  const threadedMessagesStyleRef = useRef(threadedMessagesStyle);
  let defaultStyle: ThreadedMessagesStyle = new ThreadedMessagesStyle({
    width: "100%",
    height: "100%",
    background: theme.palette.getBackground(),
    borderRadius: "none",
    border: "none",
    titleColor: theme.palette.getAccent(),
    titleFont: fontHelper(theme.typography.title1),
    closeIconTint: theme.palette.getPrimary(),
  });
  threadedMessagesStyleRef.current = {
    ...defaultStyle,
    ...threadedMessagesStyle,
  };
  titleStyle.textFont =
    threadedMessagesStyleRef?.current?.titleFont ||
    fontHelper(theme.typography.title1);
  titleStyle.textColor =
    threadedMessagesStyleRef?.current?.titleColor || theme.palette.getAccent();
  titleStyle.background = "transparent";

  buttonStyle.buttonIconTint =
    threadedMessagesStyleRef?.current?.closeIconTint ||
    theme.palette.getPrimary();

  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(null);
  const onErrorCallback = useCometChatErrorHandler(onError);

  const userObject = useMemo(() => {
    if (
      loggedInUser &&
      parentMessage?.getReceiverType() ===
      CometChatUIKitConstants.MessageReceiverType.user
    ) {
      if (parentMessage?.getSender()?.getUid() === loggedInUser?.getUid()) {
        return parentMessage?.getReceiver() as CometChat.User;
      } else {
        return parentMessage?.getSender() as CometChat.User;
      }
    }
  }, [parentMessage, loggedInUser]);

  const groupObject = useMemo(() => {
    if (loggedInUser) {
      if (
        parentMessage?.getReceiverType() ===
        CometChatUIKitConstants.MessageReceiverType.group
      ) {
        return parentMessage?.getReceiver() as CometChat.Group;
      }
    }
  }, [loggedInUser, parentMessage]);

  const parentMessageObjectId = parentMessageObject.getId();

  const requestBuilder = useMemo(() => {
    return new CometChat.MessagesRequestBuilder()
      .setCategories(ChatConfigurator.getDataSource().getAllMessageCategories())
      .setTypes(ChatConfigurator.getDataSource().getAllMessageTypes())
      .hideReplies(true)
      .setLimit(20)
      .setParentMessageId(parentMessageObjectId);
  }, [parentMessageObjectId]);

  const updateReceipt = useCallback(
    (messageReceipt: CometChat.MessageReceipt) => {
      try {
        if (Number(messageReceipt?.getMessageId()) === parentMessageObjectId) {
          if (messageReceipt?.getReadAt()) {
            setParentMessageObject((prevState: CometChat.BaseMessage) => {
              const tempObject = CometChatUIKitUtility.clone(
                prevState
              ) as CometChat.BaseMessage;
              tempObject?.setReadAt(messageReceipt?.getReadAt());
              return tempObject;
            });
          } else if (messageReceipt?.getDeliveredAt()) {
            setParentMessageObject((prevState: CometChat.BaseMessage) => {
              const tempObject = CometChatUIKitUtility.clone(
                prevState
              ) as CometChat.BaseMessage;
              tempObject?.setReadAt(messageReceipt?.getDeliveredAt());
              return tempObject;
            });
          }
        }
      } catch (error: any) {
        onErrorCallback(error);
      }
    },
    [parentMessageObjectId, setParentMessageObject, onErrorCallback]
  );

  const updateMessage = useCallback(
    (message: CometChat.BaseMessage) => {
      try {
        if (parentMessageObjectId === message?.getId()) {
          setParentMessageObject((prevState: CometChat.BaseMessage) => {
            const tempObject = CometChatUIKitUtility.clone(
              message
            ) as CometChat.BaseMessage;
            return tempObject;
          });
        }
      } catch (error: any) {
        onErrorCallback(error);
      }
    },
    [parentMessageObjectId, setParentMessageObject, onErrorCallback]
  );

  const addListener = useCallback(() => {
    const onMessagesDelivered =
      CometChatMessageEvents.onMessagesDelivered.subscribe(
        (messageReceipt: CometChat.MessageReceipt) => {
          updateReceipt(messageReceipt);
        }
      );
    const onMessagesRead = CometChatMessageEvents.onMessagesRead.subscribe(
      (messageReceipt: CometChat.MessageReceipt) => {
        updateReceipt(messageReceipt);
      }
    );
    const onMessageDeleted = CometChatMessageEvents.onMessageDeleted.subscribe(
      (deletedMessage: CometChat.BaseMessage) => {
        updateMessage(deletedMessage);
      }
    );
    const onMessageEdited = CometChatMessageEvents.onMessageEdited.subscribe(
      (editedMessage: CometChat.BaseMessage) => {
        updateMessage(editedMessage);
      }
    );
    const onTextMessageReceived =
      CometChatMessageEvents.onTextMessageReceived.subscribe(
        (message: CometChat.TextMessage) => {
          if (
            message?.getParentMessageId() &&
            message.getParentMessageId() == parentMessage.getId()
          ) {
            setReplyCount((prevCount) => prevCount + 1);
          }
        }
      );
    const onMediaMessageReceived =
      CometChatMessageEvents.onMediaMessageReceived.subscribe(
        (message: CometChat.MediaMessage) => {
          if (
            message?.getParentMessageId() &&
            message.getParentMessageId() == parentMessage.getId()
          ) {
            setReplyCount((prevCount) => prevCount + 1);
          }
        }
      );
    const onCustomMessageReceived =
      CometChatMessageEvents.onCustomMessageReceived.subscribe(
        (message: CometChat.CustomMessage) => {
          if (
            message?.getParentMessageId() &&
            message.getParentMessageId() == parentMessage.getId()
          ) {
            setReplyCount((prevCount) => prevCount + 1);
          }
        }
      );
    const onFormMessageReceived =
      CometChatMessageEvents.onFormMessageReceived.subscribe((message) => {
        if (
          message?.getParentMessageId() &&
          message.getParentMessageId() == parentMessage.getId()
        ) {
          setReplyCount((prevCount) => prevCount + 1);
        }
      });
    const onSchedulerMessageReceived =
      CometChatMessageEvents.onSchedulerMessageReceived.subscribe((message) => {
        if (
          message?.getParentMessageId() &&
          message.getParentMessageId() == parentMessage.getId()
        ) {
          setReplyCount((prevCount) => prevCount + 1);
        }
      });
    const onCardMessageReceived =
      CometChatMessageEvents.onCardMessageReceived.subscribe((message) => {
        if (
          message?.getParentMessageId() &&
          message.getParentMessageId() == parentMessage.getId()
        ) {
          setReplyCount((prevCount) => prevCount + 1);
        }
      });
    const onCustomInteractiveMessageReceived =
      CometChatMessageEvents.onCustomInteractiveMessageReceived.subscribe(
        (message) => {
          if (
            message?.getParentMessageId() &&
            message.getParentMessageId() == parentMessage.getId()
          ) {
            setReplyCount((prevCount) => prevCount + 1);
          }
        }
      );

    return () => {
      onMessagesDelivered?.unsubscribe();
      onMessagesRead?.unsubscribe();
      onMessageDeleted?.unsubscribe();
      onMessageEdited?.unsubscribe();
      onTextMessageReceived?.unsubscribe();
      onMediaMessageReceived?.unsubscribe();
      onCustomMessageReceived?.unsubscribe();
      onFormMessageReceived?.unsubscribe();
      onSchedulerMessageReceived?.unsubscribe();
      onCardMessageReceived?.unsubscribe();
      onCustomInteractiveMessageReceived?.unsubscribe();
    };
  }, [updateReceipt, updateMessage, parentMessage]);

  const subscribeToEvents = useCallback(() => {
    try {
      const ccMessageSent = CometChatMessageEvents.ccMessageSent.subscribe(
        ({ status, message }: IMessages) => {
          if (
            status === MessageStatus.success &&
            message?.getParentMessageId() === parentMessageObject?.getId()
          ) {
            setReplyCount((prevCount) => prevCount + 1);
          }
        }
      );
      const ccMessageEdited = CometChatMessageEvents.ccMessageEdited.subscribe(
        ({ status, message }: IMessages) => {
          if (
            status === MessageStatus.success &&
            message?.getId() === parentMessageObject?.getId()
          ) {
            setParentMessageObject((prevState: CometChat.BaseMessage) => {
              const tempObject = CometChatUIKitUtility.clone(
                message
              ) as CometChat.BaseMessage;
              return tempObject;
            });
          }
        }
      );
      const ccMessageDeleted =
        CometChatMessageEvents.ccMessageDeleted.subscribe(
          (message: CometChat.BaseMessage) => {
            if (message?.getId() === parentMessageObject?.getId()) {
              setParentMessageObject((prevState: CometChat.BaseMessage) => {
                const tempObject = CometChatUIKitUtility.clone(
                  message
                ) as CometChat.BaseMessage;
                return tempObject;
              });
            }
          }
        );
      const ccMessageRead = CometChatMessageEvents.ccMessageRead.subscribe(
        (message: CometChat.BaseMessage) => {
          if (message?.getId() === parentMessageObject?.getId()) {
            setParentMessageObject((prevState: CometChat.BaseMessage) => {
              const tempObject = CometChatUIKitUtility.clone(
                prevState
              ) as CometChat.BaseMessage;
              tempObject?.setReadAt(message?.getReadAt());
              return tempObject;
            });
          }
        }
      );

      return () => {
        try {
          ccMessageDeleted?.unsubscribe();
          ccMessageEdited?.unsubscribe();
          ccMessageRead?.unsubscribe();
          ccMessageSent?.unsubscribe();
        } catch (error: any) {
          onErrorCallback(error);
        }
      };
    } catch (error: any) {
      onErrorCallback(error);
    }
  }, [parentMessageObject, setParentMessageObject, onErrorCallback]);

  const closeView = useCallback(() => {
    onClose();
  }, [onClose]);

  const wrapperStyle = () => {
    return {
      background:
        threadedMessagesStyleRef?.current?.background ||
        theme.palette.getBackground(),
      height: threadedMessagesStyleRef?.current?.height,
      width: threadedMessagesStyleRef?.current?.width,
      border: threadedMessagesStyleRef?.current?.border,
      borderRadius: threadedMessagesStyleRef?.current?.borderRadius,
    };
  };

  const getThreadCount = useCallback(() => {
    try {
      const count = replyCount || 0;
      const suffix = count === 1 ? localize("REPLY") : localize("REPLIES");
      return `${count} ${suffix}`;
    } catch (error: any) {
      onErrorCallback(error);
    }
  }, [onErrorCallback, replyCount]);

  const getBubbleView = useCallback(() => {
    if (bubbleView && parentMessageObject) {
      return bubbleView(parentMessageObject);
    }
    return null;
  }, [parentMessageObject, bubbleView]);

  Hooks(
    loggedInUser,
    setLoggedInUser,
    addListener,
    subscribeToEvents,
    onErrorCallback,
    parentMessage,
    setReplyCount
  );

  return (
    <div
      className='cc-threaded-messages__wrapper'
      style={{ ...wrapperStyle(), ...ThreadedMessagesWrapperStyle() }}
    >
      <div
        className='cc-threaded-messages__header'
        style={ThreadedMessagesHeaderStyle()}
      >
        <div
          className='cc-threaded-messages__title'
          style={ThreadedMessagesTitleStyle()}
        >
          <cometchat-label
            text={title}
            labelStyle={JSON.stringify(titleStyle)}
          ></cometchat-label>
        </div>
        <div
          className='cc-threaded-messages__close'
          style={ThreadedMessagesCloseButtonStyle()}
        >
          <cometchat-button
            iconURL={closeIconURL}
            buttonStyle={JSON.stringify(buttonStyle)}
            onClick={closeView}
          ></cometchat-button>
        </div>
      </div>
      <div className='cc-threaded-messages' style={threadedMessageListStyle()}>
        <div
          className='cc-threaded-messages__bubbleview'
          style={ThreadedMessagesBubbleViewStyle()}
        >
          {getBubbleView()}
        </div>
        <div
          className='cc-threaded-messages__actionview'
          style={ThreadedMessagesActionViewStyle(theme)}
        >
          {messageActionView ? (
            messageActionView
          ) : (
            <cometchat-button
              text={getThreadCount()}
              buttonStyle={JSON.stringify(actionButtonStyle(theme))}
            ></cometchat-button>
          )}
        </div>
        {!messageListView ? <div
          className='cc-threaded-messages__list'
          style={ThreadedMessagesListStyle()}
        >
          <CometChatMessageList
            parentMessageId={parentMessageObject?.getId()}
            user={userObject}
            group={groupObject}

            messagesRequestBuilder={
              requestBuilder
            }


          />
        </div> : (userObject || groupObject) ? messageListView(userObject, groupObject, parentMessage) : null}
      </div>
      {!hideMessageComposer && !messageComposerView ? <div
        className='cc-threaded-messages__composer'
        style={ThreadedMessagesComposerStyle()}
      >
        <CometChatMessageComposer

          parentMessageId={parentMessageObject?.getId()}
          user={userObject}
          group={groupObject}





          textFormatters={
            []
          }

        />
      </div> : null}
      {!hideMessageComposer && messageComposerView && (userObject || groupObject) ? messageComposerView(userObject, groupObject, parentMessage) : null}

    </div>
  );
};

export { CometChatThreadedMessages };
