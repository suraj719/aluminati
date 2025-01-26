const defaultAppState = {
  activeTab: "chats",
  selectedItem: undefined,
  selectedItemUser: undefined,
  selectedItemGroup: undefined,
  selectedItemCall: undefined,
  sideComponent: { visible: false, type: "" },
  threadedMessage: undefined,
  showNewChat: false,
  showJoinGroup: false,
  newChat: undefined,
};

const appReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case "updateActiveTab": {
      return { ...state, activeTab: action.payload };
    }
    case "updateSelectedItem": {
      return { ...state, selectedItem: action.payload };
    }
    case "updateSelectedItemUser": {
      return { ...state, selectedItemUser: action.payload };
    }
    case "updateSelectedItemGroup": {
      return { ...state, selectedItemGroup: action.payload };
    }
    case "updateSelectedItemCall": {
      return { ...state, selectedItemCall: action.payload };
    }
    case "updateSideComponent": {
      return { ...state, sideComponent: action.payload };
    }
    case "updateThreadedMessage": {
      return { ...state, threadedMessage: action.payload };
    }
    case "showNewChat": {
      return { ...state, showNewChat: action.payload };
    }
    case "newChat": {
      return { ...state, newChat: action.payload, showNewChat: false };
    }
    case "updateShowJoinGroup": {
      return { ...state, showJoinGroup: action.payload };
    }
    case "resetAppState": {
      return defaultAppState;
    }
    default: {
      return state;
    }
  }
};

export { defaultAppState, appReducer };
