import { useCallback, useRef, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useCometChatTransferOwnership } from "./useCometChatTransferOwnership";
import SearchIcon from "../../../assets/search.svg";
import SpinnerIcon from "../../../assets/spinnerIcon.svg";
import "../../../styles/CometChatTransferOwnership/CometChatTransferOwnership.css";
import {
  CometChatButton,
  CometChatGroupEvents,
  CometChatGroupMembers,
  CometChatOption,
  CometChatRadioButton,
  CometChatUIKitConstants,
  CometChatUIKitUtility,
  SelectionMode,
  TitleAlignment,
  localize,
  useCometChatErrorHandler,
  useRefSync,
} from "@cometchat/chat-uikit-react";

/**
 * Renders transfer ownership view related to a group of a CometChat App
 */
export function CometChatTransferOwnership(props) {
  const {
    group,
    title = localize("TRANSFER_OWNERSHIP"),
    titleAlignment = TitleAlignment.center,
    searchIconURL = SearchIcon,
    searchPlaceholderText = localize("SEARCH"),
    hideSearch = false,
    groupMembersRequestBuilder,
    searchRequestBuilder,
    loadingIconURL = SpinnerIcon,
    loadingStateView,
    emptyStateText = localize("NO_USERS_FOUND"),
    emptyStateView,
    errorStateText = localize("SOMETHING_WRONG"),
    errorStateView,
    onError,
    hideSeparator = false,
    disableUsersPresence = false,
    closeButtonIconURL,
    onClose,
    listItemView,
    subtitleView,
    transferButtonText = localize("TRANSFER"),
    onTransferOwnership,
    cancelButtonText = localize("CANCEL"),
    options,
  } = props;

  const [loggedInUser, setLoggedInUser] =
    (useState < CometChat.User) | (null > null);
  const [isDisabled, setIsDisabled] = useState(true);
  const selectedMemberRef = (useRef < CometChat.GroupMember) | (null > null);
  const errorHandler = useCometChatErrorHandler(onError);
  const onTransferOwnershipPropRef = useRefSync(onTransferOwnership);
  const groupPropRef = useRefSync(group);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  /**
   * Changes `selectedMemberRef` reference
   */
  function onSelect(groupMember) {
    if (isDisabled) {
      setIsDisabled(false);
    }
    selectedMemberRef.current = groupMember;
  }

  /**
   * Creates tail view
   */
  function tailView(groupMember) {
    const scope =
      group.getOwner() === groupMember.getUid()
        ? CometChatUIKitConstants.groupMemberScope.owner
        : groupMember.getScope();
    if (group.getOwner() === groupMember.getUid()) {
      return <></>;
    } else {
      return (
        <div>
          <CometChatRadioButton
            name={"transfer-ownership"}
            id={groupMember.getUid()}
            labelText={localize(scope.toUpperCase())}
            onRadioButtonChanged={() => onSelect(groupMember)}
          />
        </div>
      );
    }
  }

  /**
   * Provides a default behavior to the `onTransferOwnership` prop
   */
  const onTransferOwnershipWrapper = useCallback(async () => {
    const selectedMember = selectedMemberRef.current;
    if (!selectedMember) {
      return;
    }
    setIsError(false);
    setIsLoading(true);
    try {
      const currentGroup = groupPropRef.current;
      await CometChat.transferGroupOwnership(
        currentGroup.getGuid(),
        selectedMember.getUid()
      );
      setIsLoading(false);
      if (loggedInUser) {
        const groupClone = CometChatUIKitUtility.clone(currentGroup);
        groupClone.setOwner(selectedMember.getUid());
        CometChatGroupEvents.ccOwnershipChanged.next({
          group: groupClone,
          newOwner: CometChatUIKitUtility.clone(selectedMember),
        });
        if (onClose) {
          onClose();
        }
      }
      selectedMemberRef.current = null;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      errorHandler(error);
    }
  }, [errorHandler, loggedInUser, groupPropRef, onTransferOwnershipPropRef]);

  /**
   * Creates confirm button view
   */
  function getConfirmButtonView() {
    return (
      <div
        className={`cometchat-transfer-ownership__transfer-button ${
          isDisabled
            ? "cometchat-transfer-ownership__transfer-button-disabled"
            : ""
        }`}
      >
        <CometChatButton
          text={transferButtonText}
          disabled={isDisabled}
          isLoading={isLoading}
          onClick={onTransferOwnershipWrapper}
        />
      </div>
    );
  }

  /**
   * Creates cancel button view
   */
  function getCancelButtonView() {
    return (
      <div className="cometchat-transfer-ownership__cancel-button">
        <CometChatButton text={cancelButtonText} onClick={onClose} />
      </div>
    );
  }

  useCometChatTransferOwnership({
    errorHandler,
    setLoggedInUser,
  });

  return (
    <div className="cometchat-transfer-ownership">
      <CometChatGroupMembers
        hideError={undefined}
        onItemClick={undefined}
        options={options}
        group={group}
        hideSearch={hideSearch}
        groupMemberRequestBuilder={groupMembersRequestBuilder}
        searchRequestBuilder={searchRequestBuilder}
        loadingView={loadingStateView}
        emptyView={emptyStateView}
        errorView={errorStateView}
        onError={errorHandler}
        selectionMode={SelectionMode.none}
        itemView={listItemView}
        subtitleView={subtitleView}
        trailingView={tailView}
      />

      <div className="cometchat-transfer-ownership__buttons-wrapper">
        {isError ? (
          <div className="cometchat-transfer-ownership_error-view">
            {localize("SOMETHING_WRONG")}
          </div>
        ) : null}
        <div className="cometchat-transfer-ownership__buttons">
          {getCancelButtonView()}
          {getConfirmButtonView()}
        </div>
      </div>
    </div>
  );
}
