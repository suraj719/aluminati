import { useCallback, useRef, useState } from "react";
import "../../../styles/CometChatAddMembers/CometChatAddMembers.css";
import { CometChat, User } from "@cometchat/chat-sdk-javascript";
import { useCometChatAddMembers } from "./useCometChatAddMembers";
import SearchIcon from "../../../assets/search.svg";
import SpinnerIcon from "../../../assets/Spinner.svg";
import backbutton from "../../../assets/arrow_back.svg";
import closeButton from "../../../assets/close2x.svg";
import {
  CometChatButton,
  CometChatGroupEvents,
  CometChatOption,
  CometChatUIKitConstants,
  CometChatUIKitUtility,
  CometChatUsers,
  SelectionMode,
  localize,
  useCometChatErrorHandler,
  useRefSync,
} from "@cometchat/chat-uikit-react";

/**
 * Renders a scrollable list of users to add to a group of a CometChat App
 */
export function CometChatAddMembers(props) {
  const {
    backButtonIconURL = backbutton,
    showBackButton = false,
    onBack,
    title = localize("ADD_MEMBERS"),
    hideSearch = false,
    searchIconURL = SearchIcon,
    searchPlaceholderText = localize("SEARCH"),
    showSectionHeader = false,
    sectionHeaderField = "getName",
    loadingIconURL = SpinnerIcon,
    loadingStateView,
    emptyStateText = localize("NO_USERS_FOUND"),
    emptyStateView,
    errorStateText = localize("SOMETHING_WRONG"),
    errorStateView,
    hideError = false,
    disableUsersPresence = false,
    hideSeparator = false,
    onError,
    menus,
    options,
    selectionMode = SelectionMode.multiple,
    onSelect,
    usersRequestBuilder,
    searchRequestBuilder,
    listItemView,
    subtitleView,
    group,
    onAddMembersButtonClick = null,
    buttonText = localize("ADD_MEMBERS"),
    closeButtonIconURL = closeButton,
    onClose,
    statusIndicatorStyle,
  } = props;

  const membersToAddRef = useRef([]);
  const selectionModeRef = useRef(selectionMode);
  const loggedInUserRef = useRef(null);
  const onSelectPropRef = useRefSync(onSelect);
  const groupPropRef = useRefSync(group);
  const onBackPropRef = useRefSync(onBack);
  const onAddMembersButtonClickPropRef = useRefSync(onAddMembersButtonClick);
  const errorHandler = useCometChatErrorHandler(onError);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  /**
   * Creates a `CometChat.GroupMember` instance from the provided `user`
   */
  const createGroupMemberFromUser = useCallback(
    (user) => {
      const groupMember = new CometChat.GroupMember(
        user.getUid(),
        CometChatUIKitConstants.groupMemberScope.participant
      );
      groupMember.setName(user.getName());
      groupMember.setGuid(groupPropRef.current.getGuid());
      return groupMember;
    },
    [groupPropRef]
  );

  /**
   * Updates `membersToAddRef`
   *
   * @remarks
   * This function makes sure `membersToAddRef` is in sync with the UI
   */
  const onSelectWrapper = useCallback(
    (user, selected) => {
      if (onSelectPropRef.current) {
        return onSelectPropRef.current(user, selected);
      }
      if (selectionModeRef.current === SelectionMode.single) {
        membersToAddRef.current = [createGroupMemberFromUser(user)];
      } else if (selectionModeRef.current === SelectionMode.multiple) {
        updateAddMembersList(user);
      }
      if (membersToAddRef.current.length === 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    },
    [createGroupMemberFromUser, onSelectPropRef]
  );

  const updateAddMembersList = (user) => {
    const targetUid = user.getUid();
    const tmpMembersToAddList = [];
    let updated = false;
    for (let i = 0; i < membersToAddRef.current.length; i++) {
      const curMember = membersToAddRef.current[i];
      if (targetUid === curMember.getUid()) {
        updated = true;
      } else {
        tmpMembersToAddList.push(curMember);
      }
    }
    if (!updated) {
      tmpMembersToAddList.push(createGroupMemberFromUser(user));
    }
    membersToAddRef.current = tmpMembersToAddList;
  };

  /**
   * Creates a `CometChat.Action` instance
   */
  const createActionMessage = useCallback((actionOn, loggedInUser, group) => {
    const actionMessage = new CometChat.Action(
      group.getGuid(),
      CometChatUIKitConstants.MessageTypes.groupMember,
      CometChatUIKitConstants.MessageReceiverType.group,
      CometChatUIKitConstants.MessageCategory.action
    );
    actionMessage.setAction(CometChatUIKitConstants.groupMemberAction.ADDED);
    actionMessage.setActionBy(CometChatUIKitUtility.clone(loggedInUser));
    actionMessage.setActionFor(CometChatUIKitUtility.clone(group));
    actionMessage.setActionOn(CometChatUIKitUtility.clone(actionOn));
    actionMessage.setReceiver(CometChatUIKitUtility.clone(group));
    actionMessage.setSender(CometChatUIKitUtility.clone(loggedInUser));
    actionMessage.setConversationId("group_" + group.getGuid());
    actionMessage.setMuid(CometChatUIKitUtility.ID());
    actionMessage.setMessage(
      `${loggedInUser.getName()} added ${actionOn.getUid()}`
    );
    actionMessage.setSentAt(CometChatUIKitUtility.getUnixTimestamp());
    return actionMessage;
  }, []);

  /**
   * Provides a default behaviour to the `onAddMembersButtonClick` prop
   */
  const onAddBtnClickWrapper = useCallback(async () => {
    if (membersToAddRef.current.length === 0) {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const group = groupPropRef.current;
      const onAddBtnClick = onAddMembersButtonClickPropRef.current;
      if (onAddBtnClick) {
        onAddBtnClick(group.getGuid(), membersToAddRef.current);
        membersToAddRef.current = [];
        return;
      }
      const UIDsToRemove = new Set();
      const response = await CometChat.addMembersToGroup(
        group.getGuid(),
        membersToAddRef.current,
        []
      );
      setIsLoading(false);
      if (response) {
        for (const key in response) {
          if (response[key] === "success") {
            UIDsToRemove.add(key);
          }
        }
      }
      const addedMembers = [];
      for (let i = 0; i < membersToAddRef.current.length; i++) {
        const curMember = membersToAddRef.current[i];
        if (UIDsToRemove.has(curMember.getUid())) {
          addedMembers.push(curMember);
        }
      }
      const loggedInUser = loggedInUserRef.current;
      if (loggedInUser) {
        const groupClone = CometChatUIKitUtility.clone(group);
        groupClone.setMembersCount(
          group.getMembersCount() + addedMembers.length
        );
        CometChatGroupEvents.ccGroupMemberAdded.next({
          messages: addedMembers.map((addedMember) =>
            createActionMessage(addedMember, loggedInUser, groupClone)
          ),
          usersAdded: addedMembers,
          userAddedIn: groupClone,
          userAddedBy: CometChatUIKitUtility.clone(loggedInUser),
        });
      }
      membersToAddRef.current = [];
      onBackPropRef.current?.();
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      errorHandler(error);
    }
  }, [
    errorHandler,
    createActionMessage,
    groupPropRef,
    onAddMembersButtonClickPropRef,
    onBackPropRef,
  ]);

  /**
   * Creates back button view
   */
  function getBackBtnView() {
    if (!showBackButton) {
      return null;
    }
    return (
      <div className="cometchat-add-members__back-button">
        <CometChatButton iconURL={backbutton} onClick={onBack} />
      </div>
    );
  }

  /**
   * Creates add members button view
   */
  function getAddMembersBtnView() {
    return (
      <div
        className={`cometchat-add-members__add-btn-wrapper ${
          isDisabled ? "cometchat-add-members__add-btn-wrapper-disabled" : ""
        }`}
      >
        <CometChatButton
          isLoading={isLoading}
          text={buttonText}
          onClick={onAddBtnClickWrapper}
        />
      </div>
    );
  }

  const onUsersSelected = (user) => {
    updateAddMembersList(user);
    if (membersToAddRef.current.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useCometChatAddMembers({
    loggedInUserRef,
    errorHandler,
    selectionMode,
    selectionModeRef,
    membersToAddRef,
  });

  return (
    <div className="cometchat-add-members">
      <CometChatUsers
        hideSearch={hideSearch}
        showSectionHeader={showSectionHeader}
        sectionHeaderKey={sectionHeaderField}
        loadingView={loadingStateView}
        emptyView={emptyStateView}
        errorView={errorStateView}
        hideError={hideError}
        onError={onError}
        options={options}
        selectionMode={selectionMode}
        onSelect={onSelectWrapper}
        usersRequestBuilder={usersRequestBuilder}
        searchRequestBuilder={searchRequestBuilder}
        itemView={listItemView}
        subtitleView={subtitleView}
        onItemSelected={onUsersSelected}
        group={group}
      />
      {getBackBtnView()}
      {getAddMembersBtnView()}
    </div>
  );
}
