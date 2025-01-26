import { ReactNode, useCallback, useEffect, useState } from "react";
import "../../../styles/CometChatCallLog/CometChatCallLogDetails.css";
import { CometChat, User } from "@cometchat/chat-sdk-javascript";
import { CometChatCallDetailsInfo } from "./CometChatCallLogInfo";
import { CometChatCallDetailsParticipants } from "./CometChatCallLogParticipants";
import { CometChatCallDetailsRecording } from "./CometChatCallLogRecordings";
import { CometChatCallDetailsHistory } from "./CometChatCallLogHistory";
import {
  ChatConfigurator,
  CometChatListItem,
  CometChatMessageHeader,
  CometChatUIKitConstants,
  CometChatUIKitLoginListener,
  localize,
  MessageUtils,
} from "@cometchat/chat-uikit-react";

export const CometChatCallDetails = (props) => {
  const { selectedItem, onBack } = props;
  const callDetailTabItems = [
    localize("PARTICIPANTS"),
    localize("RECORDING"),
    localize("HISTORY"),
  ];
  const [activeTab, setActiveTab] = useState("Participants");
  const [user, setUser] = useState();
  const [subtitleText, setSubtitleText] = useState();

  function verifyCallUser(call, loggedInUser) {
    if (call.getInitiator().getUid() === loggedInUser.getUid()) {
      return call.getReceiver();
    } else {
      return call.getInitiator();
    }
  }
  useEffect(() => {
    let isBlocked = new MessageUtils().getUserStatusVisible(user);
    const userListenerId = "users_custom" + Date.now();
    if (isBlocked) {
      setSubtitleText("");
      return;
    }
    setSubtitleText(user?.getStatus());
    CometChat.addUserListener(
      userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser) => {
          if (user?.getUid() === onlineUser.getUid()) {
            setSubtitleText(onlineUser?.getStatus());
          }
        },
        onUserOffline: (offlineUser) => {
          if (user?.getUid() === offlineUser?.getUid()) {
            setSubtitleText(offlineUser?.getStatus());
          }
        },
      })
    );
    return () => {
      CometChat.removeUserListener(userListenerId);
    };
  }, [user]);

  useEffect(() => {
    const loggedInUser = CometChatUIKitLoginListener.getLoggedInUser();
    const callUser = verifyCallUser(selectedItem, loggedInUser);
    if (
      selectedItem.receiverType ===
      CometChatUIKitConstants.MessageReceiverType.user
    ) {
      CometChat.getUser(callUser.uid).then((response) => {
        setUser(response);
      });
    }
  }, [selectedItem]);
  const getSubtitleView = useCallback(() => {
    return (
      <div className={`cometchat-call-log-details__subtitle`}>
        {subtitleText}
      </div>
    );
  }, [subtitleText, user]);
  function getTrailingView() {
    return (
      <div className={`cometchat-call-log-details__trailing-view`}>
        {ChatConfigurator.getDataSource().getAuxiliaryHeaderMenu(user)}
      </div>
    );
  }

  return (
    <div className="cometchat-call-log-details">
      <div className="cometchat-call-log-details__header">
        <div
          className="cometchat-call-log-details__header-back"
          onClick={onBack}
        />
        {localize("CALL_DETAILS")}
      </div>
      <div className="cometchat-call-log-details__call-log-item">
        <CometChatListItem
          avatarName={user?.getName()}
          avatarURL={user?.getAvatar()}
          title={user?.getName() || ""}
          subtitleView={getSubtitleView()}
          trailingView={getTrailingView()}
        />
      </div>
      <CometChatCallDetailsInfo call={selectedItem} />
      <div className="cometchat-call-log-details__tabs">
        {callDetailTabItems.map((tabItem) => (
          <div
            onClick={() => setActiveTab(tabItem)}
            className={
              activeTab === tabItem
                ? "cometchat-call-log-details__tabs-tab-item-active"
                : "cometchat-call-log-details__tabs-tab-item"
            }
          >
            {tabItem}
          </div>
        ))}
      </div>

      <>
        {activeTab === "Participants" ? (
          <CometChatCallDetailsParticipants call={selectedItem} />
        ) : activeTab === "Recording" ? (
          <CometChatCallDetailsRecording call={selectedItem} />
        ) : activeTab === "History" ? (
          <CometChatCallDetailsHistory call={selectedItem} />
        ) : null}
      </>
    </div>
  );
};
