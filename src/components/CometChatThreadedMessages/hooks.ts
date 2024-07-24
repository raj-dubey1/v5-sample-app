import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect } from "react";

function Hooks(
    loggedInUser: any,
    setLoggedInUser: any,
    addListener: Function,
    subscribeToEvents: Function,
    onErrorCallback: Function,
    parentMessage: any,
    setReplyCount: Function,
) {

    useEffect(
        () => {
            CometChat.getLoggedinUser().then(
                (user) => {
                    setLoggedInUser(user);
                },
                (error: CometChat.CometChatException) => {
                    onErrorCallback(error);
                }
            );
        },
        [setLoggedInUser, onErrorCallback]
    );

    useEffect(() => {
        if (loggedInUser) {
            const removeListener = addListener();
            const unsubscribeFromEvents = subscribeToEvents();
            return () => {
                removeListener();
                unsubscribeFromEvents();
            };
        }
    }, [loggedInUser, addListener, subscribeToEvents]);

    useEffect(() => {
        if (parentMessage?.getReplyCount() === undefined) {
            setReplyCount(0);
        } else {
            setReplyCount(parentMessage?.getReplyCount());
        }
    }, [parentMessage, setReplyCount]);

}

export { Hooks };
