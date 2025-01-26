import { useEffect, useState } from "react";
import createGroupIcon from "../../../assets/create-group.svg";
import "../../../styles/CometChatSelector/CometChatSelector.css";
import { CometChatJoinGroup } from "../CometChatJoinGroup/CometChatJoinGroup";
import CometChatCreateGroup from "../CometChatCreateGroup/CometChatCreateGroup";
import {
  CometChatButton,
  CometChatCallLogs,
  CometChatConversations,
  CometChatGroups,
  CometChatUIKitLoginListener,
  CometChatUsers,
  localize,
} from "@cometchat/chat-uikit-react";
export const CometChatSelector = (props) => {
  const {
    group,
    showJoinGroup,
    activeItem,
    activeTab,
    onSelectorItemClicked = () => {},
    onProtectedGroupJoin = () => {},
    showCreateGroup = true,
    setShowCreateGroup = () => {},
    onHide = () => {},
    onNewChatClicked = () => {},
    onGroupCreated = () => {},
  } = props;

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    let loggedInUsers = CometChatUIKitLoginListener.getLoggedInUser();
    setLoggedInUser(loggedInUsers);
  }, [CometChatUIKitLoginListener?.getLoggedInUser()]);

  const conversationsHeaderView = () => {
    return (
      <div className="cometchat-conversations-header">
        <div className="cometchat-conversations-header__title">Chats</div>
        <div className="chat-menu">
          <div
            onClick={onNewChatClicked}
            className={`rounded-lg w-full flex items-center p-2 cursor-pointer hover:bg-gray-800 hover:text-white text-gray-600 text-sm gap-x-4 `}
          >
            <img
              src={require("../../../assets/start_chat.svg").default}
              alt="newmsg"
            />
          </div>
        </div>
      </div>
    );
  };

  const groupsHeaderView = () => {
    return (
      <div className="cometchat-groups-header">
        <div className="cometchat-groups-header__title">
          {localize("GROUPS")}
        </div>
        <CometChatButton
          onClick={() => {
            setShowCreateGroup(true);
          }}
          iconURL={createGroupIcon}
        />
      </div>
    );
  };

  return (
    <>
      {loggedInUser && (
        <>
          {showJoinGroup && group && (
            <CometChatJoinGroup
              group={group}
              onHide={onHide}
              onProtectedGroupJoin={(group) => onProtectedGroupJoin(group)}
            />
          )}
          {activeTab === "chats" ? (
            <CometChatConversations
              activeConversation={activeItem}
              headerView={conversationsHeaderView()}
              onItemClick={(e) => {
                onSelectorItemClicked(e, "updateSelectedItem");
              }}
            />
          ) : activeTab === "calls" ? (
            <CometChatCallLogs
              activeCall={activeItem}
              onItemClick={(e) => {
                onSelectorItemClicked(e, "updateSelectedItemCall");
              }}
            />
          ) : activeTab === "users" ? (
            <CometChatUsers
              activeUser={activeItem}
              onItemClick={(e) => {
                onSelectorItemClicked(e, "updateSelectedItemUser");
              }}
            />
          ) : activeTab === "groups" ? (
            <CometChatGroups
              activeGroup={activeItem}
              headerView={groupsHeaderView()}
              onItemClick={(e) => {
                onSelectorItemClicked(e, "updateSelectedItemGroup");
              }}
            />
          ) : null}
          {showCreateGroup && (
            <CometChatCreateGroup
              setShowCreateGroup={setShowCreateGroup}
              onGroupCreated={(group) => onGroupCreated(group)}
            />
          )}
        </>
      )}
    </>
  );
};
