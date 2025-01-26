import { CometChat, Group, GroupType } from "@cometchat/chat-sdk-javascript";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import "../../../styles/CometChatSelector/CometChatSelector.css";
import {
  CometChatAvatar,
  CometChatButton,
  CometChatGroupEvents,
  CometChatUIKitLoginListener,
  localize,
} from "@cometchat/chat-uikit-react";

export const CometChatJoinGroup = (props) => {
  const { group, onHide = () => {}, onProtectedGroupJoin = () => {} } = props;
  const [password, setPassword] = useState("");
  const [showWrongPassword, setShowWrongPassword] = useState(false);
  const loggedInUser = CometChatUIKitLoginListener.getLoggedInUser();
  const { appState, setAppState } = useContext(AppContext);

  const onPasswordChange = (e) => {
    setShowWrongPassword(false);
    setPassword(e.target.value);
  };

  const joinPrivateGroup = () => {
    CometChat.joinGroup(group.getGuid(), group.getType(), password)
      .then((response) => {
        setAppState({ type: "updateShowJoinGroup", payload: false });
        onHide();
        setAppState({
          type: "updateSideComponent",
          payload: { visible: false, type: "" },
        });
        if (appState.activeTab === "groups") {
          setAppState({ type: "newChat", payload: undefined });
          setAppState({ type: "updateSelectedItemGroup", payload: group });
        } else if (appState.activeTab === "chats") {
          setAppState({ type: "newChat", payload: { group, user: undefined } });
        }
        onProtectedGroupJoin(group);
        setTimeout(() => {
          CometChatGroupEvents.ccGroupMemberJoined.next({
            joinedGroup: response,
            joinedUser: loggedInUser,
          });
        }, 100);
      })
      .catch((error) => {
        setShowWrongPassword(true);
        console.log(error);
      });
  };

  return (
    <div className="join-group-password__wrapper">
      <div className="join-group-password">
        <div className="join-group-password__header">
          <div className="join-group-password__header-title">
            {localize("GROUP_PASSWORD")}
          </div>
          <div
            className="join-group-password__header-close"
            onClick={() => {
              setAppState({ type: "updateShowJoinGroup", payload: false });
              onHide();
            }}
          />
        </div>
        <div className="join-group-password__content">
          <div className="join-group-password__content-avatar">
            <CometChatAvatar image={group.getIcon()} name={group.getName()} />
          </div>
          <div className="join-group-password__content-text">
            <div className="join-group-password__content-text-title">
              {group.getName()}
            </div>
            <div className="join-group-password__content-text-subtitle">
              {group.getMembersCount() + localize("MEMBERS")}
            </div>
          </div>
        </div>
        <div className="join-group-password__input">
          <div className="join-group-password__input-label">
            {localize("PASSWORD")}
          </div>
          <input
            placeholder={localize("ENTER_YOUR_PASSWORD")}
            value={password}
            onChange={onPasswordChange}
          />
          {showWrongPassword && (
            <div className="join-group-password__input-wrong">
              {localize("INVALID_PASSWORD")}
            </div>
          )}
        </div>
        <div className="join-group-password__button">
          <CometChatButton
            text={localize("CONTINUE")}
            onClick={joinPrivateGroup}
          />
        </div>
      </div>
    </div>
  );
};
