import React, { useContext, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

import { CometChat } from "@cometchat/chat-sdk-javascript";

import { ContactsConfiguration, ConversationsConfiguration, DetailsConfiguration, DetailsUtils, MessageComposerConfiguration, MessageHeaderConfiguration, MessageInformationConfiguration, MessageInformationStyle, MessageListConfiguration, MessageListStyle, MessagesConfiguration, MessagesStyle, ThreadedMessagesConfiguration, UserMemberWrapperConfiguration, UsersConfiguration } from '@cometchat/uikit-shared';
import { useLocation } from 'react-router-dom';
import { CometChatTheme, CometChatPalette, CometChatLocalize, CometChatMessageEvents, CometChatUIEvents, PanelAlignment } from '@cometchat/uikit-resources';
import { CometChatThemeContext, CometChatIncomingCall, CometChatGroups, CometChatUsers, ActionSheetStyle, CometChatMessageHeader, CometChatMessageList } from './cometchat-pro-react-ui-kit/src';
import { Channel, channel } from 'diagnostics_channel';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import AIAssistBotChatView from './cometchat-pro-react-ui-kit/src/AI/AIAssistBot/AIAssistBotChatView';
// import { CometChatUI } from './cometchat-pro-react-ui-kit/src/cometchat';
import { CometChatMessageComposer } from './cometchat-pro-react-ui-kit/src/CometChatMessageComposer'
import { CometChatConversationsWithMessages } from './components/CometChatConversationsWithMessages';
interface IAppProps {
  loggedInUser?: CometChat.User
}

function App(props: IAppProps) {

  // CometChatLocalize.setLocale("hi")
  const user = new CometChat.User("superhero1", "Iron man");
  const group = new CometChat.Group("group__1713772073306", 'Comic', 'public')

  const [chatWith, setChatWith] = React.useState<undefined | CometChat.Group>(undefined);
  const [chatWithUser, setChatWithUser] = React.useState<undefined | CometChat.User>(undefined);
  const [incomingCall, setIncomingCall] = React.useState<undefined | CometChat.Call>(undefined);
  // const { state } = useLocation();
  // const changeThemeToCustom = state?.changeThemeToCustom;
  const { theme } = useContext(CometChatThemeContext);

  const themeContext = useMemo(() => {
    let res = theme;

    return {
      theme: new CometChatTheme({
        palette: new CometChatPalette({
          mode: "light",
        }),
      })
    };
  }, [theme]);
  useEffect(() => {
    CometChat.getGroup('group__1715010936232').then(
      group => {
        setChatWith(group);
      }, error => {
        console.log("Group details fetching failed with error:", error);
      }
    )
  }, []);
  React.useEffect(() => {
    // setTimeout(() => {
    //   CometChatUIEvents.ccComposeMessage.next("hello ")
    //   setTimeout(() => {
    //     CometChatUIEvents.ccComposeMessage.next("hello 2")
    //   }, 3000);
    // }, 5000);
    // CometChat.getGroup("group__1691993457022").then(group => setChatWith(group));
    CometChat.getUser("superhero1").then(user => setChatWithUser(user));
    CometChat.addCallListener("CALL_LISTENER_1", new CometChat.CallListener({
      onIncomingCallReceived: (call: CometChat.Call) => {
        setIncomingCall(call)
      },
      onIncomingCallCancelled: (call: CometChat.Call) => {
        setIncomingCall(undefined);
      },
    }))
  }, []);
  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     CometChatUIEvents.ccShowPanel.next({
  //       position: PanelAlignment.messageListHeader,
  //       child: <>Hi</>
  //     })
  //     setTimeout(() => {
  //       CometChatUIEvents.ccHidePanel.next(
  //         PanelAlignment.messageListHeader,
  //       )
  //     }, 10000);
  //     console.log("now");
  //     CometChatUIEvents.ccShowPanel.next({
  //       position: PanelAlignment.messageListFooter,
  //       child: <>{Date.now() + 1}</>
  //     })
  //   }, 5000)
  // }, [])
  return (
    <div>
      {/* <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat> */}
      <div className='App'>
        <CometChatThemeContext.Provider value={themeContext}>
          <CometChatConversationsWithMessages />
          {/* <CometChatMessageHeader user={chatWithUser} />
          <CometChatMessageList user={chatWithUser} />
          <CometChatMessageComposer user={chatWithUser} /> */}
          {/* <CometChatMessageHeader group={chatWith} />
          <CometChatMessageList group={chatWith} />
          <CometChatMessageComposer group={chatWith} /> */}
        </CometChatThemeContext.Provider>
        {/* <CometChatThemeContext.Provider value={themeContext}>
          <CometChatIncomingCall />
          <CometChatConversationsWithMessages
            // isMobileView={false}
            messagesConfiguration={new MessagesConfiguration({
              // hideMessageComposer: true,
              messageListConfiguration: new MessageListConfiguration({
                // headerView: <>dawdawdaw</>
                // backdropStyle: { background: "red" },
                // scrollToBottomOnNewMessages: true,
                // avatarStyle: {
                //   nameTextColor: "pink"
                // },
                // messageListStyle: new MessageListStyle({
                //   threadReplyIconTint: "red",
                //   threadReplyTextColor: "pink",
                //   threadReplyUnreadBackground: "green"
                // }),
                // emptyStateView: <>hello</>
                // messageListStyle: new MessageListStyle({
                //   nameTextColor: "red",
                //   nameTextFont: "400 15px Inter"
                // })
                // messageInformationConfiguration: new MessageInformationConfiguration({
                //   messageInformationStyle: { background: "red" }
                // })
                // messagesRequestBuilder: new CometChat.MessagesRequestBuilder().setLimit(10).setCategories(["action"]),
              })
            })}
          // startConversationConfiguration={new ContactsConfiguration({
          //   usersConfiguration: new UsersConfiguration({
          //     usersRequestBuilder: new CometChat.UsersRequestBuilder().setLimit(4)
          //   })
          // })} isMobileView={false}
          //   messagesConfiguration={new MessagesConfiguration({
          //     messageListConfiguration: new MessageListConfiguration({
          //       loadingIconURL: logo,
          //       messagesRequestBuilder: new CometChat.MessagesRequestBuilder().setLimit(10).setCategories(["action"]),
          //       messageInformationConfiguration: new MessageInformationConfiguration({
          //         messageInformationStyle: new MessageInformationStyle({
          //           background: "red"
          //         })
          //       })
          //     }),
          //   })}
          // conversationsConfiguration={new ConversationsConfiguration({
          //   backdropStyle: {
          //     background: "red"
          //   }
          // })}
          // messagesConfiguration={new MessagesConfiguration({
          //   messagesStyle: new MessageListStyle({
          //     background: "blue"
          //   }),
          //   detailsConfiguration: new DetailsConfiguration({
          //     data: (user, group) => {
          //       console.log(user, group)
          //       return []
          //     }
          //   }),
          // messageListConfiguration: new MessageListConfiguration({
          //   loadingIconURL: logo,
          //   messagesRequestBuilder: new CometChat.MessagesRequestBuilder().setLimit(10).setTypes(["text", "image"]).setCategories(["message"]),
          //   messageInformationConfiguration: new MessageInformationConfiguration({
          //     messageInformationStyle: new MessageInformationStyle({
          //       background: "red"
          //     })
          //   })
          // }),
          //   messageComposerConfiguration: new MessageComposerConfiguration({
          //     sendButtonIconURL: logo,
          //     userMemberWrapperConfiguration: new UserMemberWrapperConfiguration({
          //       hideSeparator: true
          //     }),
          //     actionSheetStyle: new ActionSheetStyle({
          //       background: "white",

          //     })
          //   })
          // })}
          />
        </CometChatThemeContext.Provider> */}
        {/* <CometChatMessages group={chatWith} messageListConfiguration={new MessageListConfiguration({
          messageListStyle: new MessageListStyle({
            height: "100%",
            width: "100%"
          })
        })} messagesStyle={new MessagesStyle({
          height: "100%",
          width: "100%",
        })}></CometChatMessages> */}
        {/* <AIAssistBotChatView bot={user} sender={user}></AIAssistBotChatView> */}

      </div>
    </div>
    // <div className="App">

    //   <CometChatThemeContext.Provider value={themeContext}>
    //     {/* <CometChatConversationsWithMessages isMobileView={false}  />     </CometChatThemeContext.Provider> */}
    //     {/* <CometChatMessages user={chatWithUser}/> </CometChatThemeContext.Provider> */}
    //     {/* <CometChatUI /> */}
    //   <CometChatConversationsWithMessages isMobileView={false}
    //   // startConversationConfiguration={new ContactsConfiguration({
    //   //   usersConfiguration: new UsersConfiguration({ usersRequestBuilder: new CometChat.UsersRequestBuilder().setLimit(1) })
    //   // })}
    //   />
    // </CometChatThemeContext.Provider>
    //   <CometChatIncomingCall call={incomingCall} />
    //   {/* <CometChatMessages/> */}

    //   {/* { <CometChatConversationsWithMessages  /> }; */}
    //   {/* {chatWith ? <GroupsWithMessages group={chatWith} /> : null}; */}
    //   {/* {chatWith ? <GroupsWithMessages group={chatWith} /> : null}; */}
    //   {/* {chatWith ? (<Messages group={chatWith} />) : null} */}
    //   {/* {chatWith ? (<MessageList group={chatWith} />) : null} */}
    //   {/* <div>
    //     <MessageComposer group={chatWith} />
    //   </div> */}
    //   {/* <div>
    //     <MessageHeader group={chatWith}  />
    //   </div> */}
    //   {/* {chatWith ? <Details group={chatWith} /> : null} */}
    //   {/* {chatWith ? <GroupMembers group={chatWith} /> : null} */}
    //   {/* {chatWith ? <BannedMembers group={chatWith} /> : null} */}
    //   {/* {chatWith ? <AddMembers group={chatWith} /> : null} */}
    //   {/* {chatWith ? <Transfer group={chatWith} /> : null} */}
    // </div>
  );
}

export default App;
