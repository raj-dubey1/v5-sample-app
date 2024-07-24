import { useEffect } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

function Hooks(
    loggedInUser: any,
    setLoggedInUser: Function,
    subscribeToEvents: Function,
    ccHeaderMenuRef: any,
    setOpenDetails: any,
    user: CometChat.User | null,
    setActiveUser: Function,
    group: CometChat.Group | null,
    setActiveGroup: Function,
    setOpenThreadedMessages: any
) {
    useEffect(
        () => {
            CometChat.getLoggedinUser().then(
                (userObject: CometChat.User | null) => {
                    if (userObject) {
                        setLoggedInUser(userObject);
                    }
                }
            );
        },
        [setLoggedInUser]
    );

    useEffect(
        () => {
            const element = ccHeaderMenuRef.current;
            if (!element) return;
            const headerButtonClick = (event: any) => {
                setOpenDetails(true);
            }
            element.removeEventListener("cc-menu-clicked", headerButtonClick);

            return () => {
                element.removeEventListener("cc-menu-clicked", headerButtonClick);
            }
        }, [ccHeaderMenuRef, setOpenDetails]
    );

    useEffect(() => {
        if (user) {
            setActiveGroup(null);
            setActiveUser((previousUser: CometChat.User) => {

                if (previousUser?.getUid() !== user?.getUid()) {
                    setOpenDetails(false);
                    setOpenThreadedMessages(false);
                }
                return user;
            });
        }

    }, [user, setActiveUser, setActiveGroup, setOpenDetails, setOpenThreadedMessages]);

    useEffect(() => {
        if (group) {
            setActiveUser(null);
            setActiveGroup((previousGroup: CometChat.Group) => {

                if (previousGroup?.getGuid() !== group?.getGuid()) {
                    setOpenDetails(false);
                    setOpenThreadedMessages(false);
                }
                return group;
            });
        }

    }, [group, setActiveUser, setActiveGroup, setOpenDetails, setOpenThreadedMessages]);

    useEffect(() => {
        let unsubscribeFromEvents: () => void;
        if (loggedInUser) {
            unsubscribeFromEvents = subscribeToEvents();
        }
        return () => {
            unsubscribeFromEvents?.();
        }
    }, [loggedInUser, subscribeToEvents]);

}

export { Hooks };
