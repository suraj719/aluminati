import React from "react";
import Chat from "./Chat";

export default function Inbox() {
  let [libraryImported, setLibraryImported] = React.useState(false);

  React.useEffect(() => {
    window.CometChat = require("@cometchat/chat-sdk-javascript").CometChat;
    setLibraryImported(true);
  });

  return libraryImported ? <Chat /> : <p>Loading....</p>;
}
