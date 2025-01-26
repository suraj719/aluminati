import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
  localize,
} from "@cometchat/chat-uikit-react";
import "../../../styles/CometChatMessages/CometChatMessages.css";
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatUserEvents } from "@cometchat/chat-uikit-react";

export const CometChatMessages = (props) => {
  const {
    user,
    group,
    headerMenu,
    onThreadRepliesClick,
    showComposer,
    onBack = () => {},
  } = props;
  const [showComposerState, setShowComposerState] = useState(showComposer);

  useEffect(() => {
    setShowComposerState(showComposer);
    if (user?.getHasBlockedMe?.() || user?.getBlockedByMe?.()) {
      setShowComposerState(false);
    }
  }, [user, showComposer]);

  return (
    <div className="cometchat-messages-wrapper">
      <div className="cometchat-header-wrapper">
        <CometChatMessageHeader
          user={user}
          group={group}
          auxiliaryButtonView={headerMenu()}
          onBack={onBack}
        />
      </div>
      <div className="cometchat-message-list-wrapper">
        <CometChatMessageList
          user={user}
          group={group}
          onThreadRepliesClick={(message) => onThreadRepliesClick(message)}
        />
      </div>
      {showComposerState ? (
        <div className="cometchat-composer-wrapper">
          <CometChatMessageComposer user={user} group={group} />
        </div>
      ) : (
        <div
          className="message-composer-blocked"
          onClick={() => {
            if (user) {
              CometChat.unblockUsers([user?.getUid()]).then(() => {
                user.setBlockedByMe(false);
                CometChatUserEvents.ccUserUnblocked.next(user);
              });
            }
          }}
        >
          <div className="message-composer-blocked__text">
            {localize("CANNOT_SEND_MESSAGE_TO_BLOCKED_USER")}{" "}
            <a> {localize("CLICK_TO_UNBLOCK")}</a>
          </div>
        </div>
      )}
    </div>
  );
};
