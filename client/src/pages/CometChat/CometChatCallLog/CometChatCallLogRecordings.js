import { useCallback, useMemo } from "react";
import "../../../styles/CometChatCallLog/CometChatCallLogRecordings.css";
import {
  CometChatDate,
  CometChatList,
  CometChatListItem,
  DatePatterns,
  localize,
  States,
} from "@cometchat/chat-uikit-react";

export const CometChatCallDetailsRecording = (props) => {
  const { call } = props;

  const handleDownloadClick = useCallback((item) => {
    fetch(item?.getRecordingURL())
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.download = "recording.mp4";
        document.body.appendChild(a);
        a.click();
      })
      .catch((error) => console.error(error));
  }, []);

  const getRecordings = useCallback(() => {
    try {
      return call?.getRecordings();
    } catch (e) {
      console.log(e);
    }
  }, [call]);

  const getRecordingStartTime = (item) => {
    try {
      return item?.getStartTime();
    } catch (e) {
      console.log(e);
    }
  };

  const getListItemSubtitleView = useCallback((item) => {
    return (
      <div className="cometchat-call-log-recordings__subtitle">
        <CometChatDate
          pattern={DatePatterns.DateTime}
          timestamp={getRecordingStartTime(item)}
        ></CometChatDate>
      </div>
    );
  }, []);

  const getListItemTailView = useCallback((item) => {
    return (
      <div
        className="cometchat-call-log-recordings__download"
        onClick={() => handleDownloadClick(item)}
      />
    );
  }, []);

  const getListItem = useMemo(() => {
    return function (item, index) {
      return (
        <>
          <CometChatListItem
            avatarURL=""
            title={item?.getRid()}
            subtitleView={getListItemSubtitleView(item)}
            trailingView={getListItemTailView(item)}
          />
        </>
      );
    };
  }, [getListItemSubtitleView, getListItemTailView]);

  return (
    <div className="cometchat-call-log-recordings">
      {!getRecordings() ? (
        <div className="cometchat-call-log-recordings__empty-state">
          <div className="cometchat-call-log-recordings__empty-state-icon" />
          <div className="cometchat-call-log-recordings__empty-state-text">
            {localize("NO_RECORDING_AVAILABLE")}
          </div>
        </div>
      ) : (
        <CometChatList
          hideSearch={true}
          list={getRecordings()}
          itemView={getListItem}
          listItemKey="getRid"
          state={States.loaded}
          showSectionHeader={false}
        />
      )}
    </div>
  );
};
