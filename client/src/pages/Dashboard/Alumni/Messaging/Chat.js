import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const Chat = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const init = () => {
      CometChat.init(
        process.env.REACT_APP_COMET_APP_ID,
        new CometChat.AppSettingsBuilder()
          .setRegion(process.env.REACT_APP_COMET_REGION)
          .subscribePresenceForAllUsers()
          .build()
      ).then(
        () => {
          login();
        },
        (error) => {
          console.log("Init failed with exception:", error);
        }
      );
    };

    const login = () => {
      const UID = "cometchat-uid-1";
      CometChat.login(UID, process.env.REACT_APP_COMET_AUTH_KEY).then(
        (user) => {
          setUser(user);
        },
        (error) => {
          console.log("Login failed with exception:", error);
        }
      );
    };

    init();
  }, []);

  return user ? <div>User logged in</div> : <div>User not logged in</div>;
};

export default Chat;
