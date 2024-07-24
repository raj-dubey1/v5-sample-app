import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect } from "react";

function Hooks(
    loggedInUser: any,
    setLoggedInUser: Function,
    subscribeToEvents: Function,
    onErrorCallback: Function,
    setActiveChat: any,
    user: any,
    group: any,
    startConversationBtnElement: JSX.IntrinsicElements["cometchat-button"] | null,
    showCometChatContactsView: Function,
    showCometChatContacts: any,
    hideCometChatContactsView: Function,
    setActiveUser: any,
    setActiveGroup: any,
    attachGroupListener: any
) {
    useEffect(
        () => {
            let removeListener: any;
            CometChat.getLoggedinUser().then(
                (user) => {
                    if (attachGroupListener) {
                        removeListener = attachGroupListener(user);
                    }
                    setLoggedInUser(user);
                    return () => {
                        if (removeListener) {
                            removeListener();
                        }
                    };
                },
                (error: CometChat.CometChatException) => {
                    onErrorCallback(error);
                }
            );
        },
        [setLoggedInUser, onErrorCallback]
    );

    useEffect(() => {
        let unsubscribeFromEvents: () => void;
        if (loggedInUser) {
            unsubscribeFromEvents = subscribeToEvents();
            setActiveChat();
        }
        return () => {
            unsubscribeFromEvents?.();
        }
    }, [loggedInUser, user, group, setActiveChat, subscribeToEvents]);

    useEffect(
        /**
         * Add `cc-button-clicked` event listener to the start conversation button element
         */
        () => {
            if (!startConversationBtnElement) {
                return;
            }
            async function handleEvent() {
                if (showCometChatContacts) {
                    hideCometChatContactsView()
                }
                else {
                    showCometChatContactsView()
                }

            }
            const eventName = "cc-button-clicked";
            startConversationBtnElement.addEventListener(eventName, handleEvent);
            return () => {
                startConversationBtnElement.removeEventListener(eventName, handleEvent);
            };
        }, [startConversationBtnElement, showCometChatContactsView, hideCometChatContactsView, showCometChatContacts]);

    useEffect(() => {
        setActiveUser(user);
    }, [user, setActiveUser]);

    useEffect(() => {
        setActiveGroup(group);
    }, [group, setActiveGroup])

}

export { Hooks };
