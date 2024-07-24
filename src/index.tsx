import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AIAssistBotConfiguration, AISmartRepliesConfiguration, CometChatUIKitCalls, UIKitSettingsBuilder } from "@cometchat/uikit-shared"
import { AIAssistBotExtension, AIExtensionDataSource, CometChatIncomingCall, CometChatUIKit } from './cometchat-pro-react-ui-kit/src';

import { CometChat } from '@cometchat/chat-sdk-javascript';
const appID = "208136f5ba34a5a2";
const region = "us";
const authKey = "0cbf4d625ef2b877732039f9976c128459878ad4";
//   APP_ID: "208136f5ba34a5a2",
//   REGION: "us",
//   AUTH_KEY: "0cbf4d625ef2b877732039f9976c128459878ad4",
// const appID = "244917015faa2758";
// const region = "in";
// const authKey = "a720704f2577d972ec886d0f443b6c3993e07165";
// const appID = "133990f396b8f0";
// const region = "us";
// const authKey = "4c52db69b1007f6d3311bef47e0523a2cee34f51";
// export const COMETCHAT_CONSTANTS = {
//   APP_ID: "133990f396b8f0",
//   REGION: "us",
//   AUTH_KEY: "4c52db69b1007f6d3311bef47e0523a2cee34f51",
// };
//staging app
// const appID = "238c09e68174f";
// const region = "us";
// const authKey = "a5da638fc98f9d312616b88e94df88972f735645";
// const appID = "11460d90eb03e2";
// const region = "us";
// const authKey = "4c74cea9cc63756e56119f54eb8fe26ab5139aa1";

// const appID = "245392165c5afa8d";
// const region = "eu";
// const authKey = "8e9975f88eea6a5cd743d2acba671757eeeea2c9";

// export const COMETCHAT_CONSTANTS = {
//   APP_ID: "208136f5ba34a5a2",
//   REGION: "us",
//   AUTH_KEY: "0cbf4d625ef2b877732039f9976c128459878ad4",
// const appID = "238c09e68174f";
// const region = "us";
// const authKey = "a5da638fc98f9d312616b88e94df88972f735645";
// };
// export const COMETCHAT_CONSTANTS = {
//   APP_ID: '238c09e68174f',
//   REGION: 'us',
//   AUTH_KEY: 'a5da638fc98f9d312616b88e94df88972f735645',
// }

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(appID)
  .setRegion(region)
  .setAuthKey(authKey)
  .subscribePresenceForFriends()
  // .setAdminHost(`${appID}.api-us.cometchat-staging.com/v3`)
  // .setClientHost(`${appID}.apiclient-us.cometchat-staging.com/v3`)
  .build();
// CometChatUIKit.enableCalling = () => {
//   console.log("works")
// }

CometChatUIKit.init(uiKitSettings)?.then((response) => {
  // CometChatUIKit.Localize.init("ar")
  console.log('CometChatUIKit initialization completed successfully');

  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get('uid') || "superhero1";
  console.log("urlParams", urlParams.get('uid'));
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(

    <App />
  );
  CometChatUIKit.login(uid)?.then(user => {
    console.log('CometChatUIKit login completed successfully');
    // const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    // root.render(

    //   <App loggedInUser={user} />
    // );

  });

});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
