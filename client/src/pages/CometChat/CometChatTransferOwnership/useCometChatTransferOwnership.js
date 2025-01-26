import { CometChat } from "@cometchat/chat-sdk-javascript";
import React, { useEffect } from "react";

export function useCometChatTransferOwnership(args) {
  const { errorHandler, setLoggedInUser } = args;

  useEffect(
    /**
     * Sets `loggedInUser` state to the currently logged-in user
     */
    () => {
      (async () => {
        try {
          setLoggedInUser(await CometChat.getLoggedinUser());
        } catch (error) {
          errorHandler(error);
        }
      })();
    },
    [errorHandler, setLoggedInUser]
  );
}
