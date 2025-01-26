import "../../../styles/CometChatDetails/CometChatThreadedMessages.css";
import {
  CometChatMessageComposer,
  CometChatMessageList,
  CometChatThreadedMessagePreview,
  CometChatUserEvents,
  localize,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

export const CometChatThreadedMessages = (props) => {
  const {
    message,
    requestBuilderState,
    selectedItem,
    onClose = () => {},
    showComposer = false,
  } = props;

  return (
    <div className="cometchat-threaded-message">
      <div className="cometchat-threaded-message-header">
        <CometChatThreadedMessagePreview
          parentMessage={message}
          onClose={onClose}
        />
      </div>
      {requestBuilderState?.parentMessageId === message.getId() && (
        <>
          <div className="cometchat-threaded-message-list">
            <CometChatMessageList
              parentMessageId={message.getId()}
              user={
                selectedItem?.getConversationType?.() === "user"
                  ? selectedItem?.getConversationWith()
                  : selectedItem.getUid?.()
                  ? selectedItem
                  : undefined
              }
              group={
                selectedItem?.getConversationType?.() === "group"
                  ? selectedItem?.getConversationWith()
                  : selectedItem.getGuid?.()
                  ? selectedItem
                  : undefined
              }
              messagesRequestBuilder={requestBuilderState}
            />
          </div>
          {showComposer ? (
            <div className="cometchat-threaded-message-composer">
              <CometChatMessageComposer
                parentMessageId={message.getId()}
                user={
                  selectedItem?.getConversationType?.() === "user"
                    ? selectedItem?.getConversationWith()
                    : selectedItem.getUid?.()
                    ? selectedItem
                    : undefined
                }
                group={
                  selectedItem?.getConversationType?.() === "group"
                    ? selectedItem?.getConversationWith()
                    : selectedItem.getGuid?.()
                    ? selectedItem
                    : undefined
                }
              />
            </div>
          ) : (
            <div
              className="message-composer-blocked"
              onClick={() => {
                if (selectedItem instanceof CometChat.User) {
                  CometChat.unblockUsers([selectedItem?.getUid()]).then(() => {
                    selectedItem.setBlockedByMe(false);
                    CometChatUserEvents.ccUserUnblocked.next(selectedItem);
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
        </>
      )}
    </div>
  );
};
