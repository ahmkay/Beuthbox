import React, { useState, useReducer } from "react";
import { compareDuration, compareDates } from "../../utils";
import ThumbnailGrid from "./ThumbnailGrid";
import ChannelOverview from "./ChannelOverview";
import CategoryCheckbutton from "./CategoryCheckbutton";
import DiscoverCard from "./DiscoverCard";
import NoContent from "./NoContent";

const VideoFilterPanel = ({ videoResult, channelResult, playlistResult }) => {
  const [filterType, setFilterType] = useState("all");
  const [sort, setSort] = useState("date-downwards");

  const selectFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const selectSortType = (event) => {
    setSort(event.target.value);
    const { value } = event.target;
    switch (value) {
      case "date-downwards":
        console.log("downwards inside");
        dispatch({ type: "date-downwards" });
        break;
      case "date-upwards":
        console.log("upwards inside");
        dispatch({ type: "date-upwards" });
        break;
      case "duration-downwards":
        dispatch({ type: "duration-downwards" });
        break;
      case "duration-upwards":
        dispatch({ type: "duration-upwards" });
        break;
      default:
        return;
    }
  };

  const initialState = {
    sortedvideoResult: videoResult,
    sortedplaylistResult: playlistResult,
    sortedchannelResult: channelResult,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "date-downwards":
        const videoDateDownwards = videoResult.sort(compareDates);
        const channelDateDownWards = channelResult.sort(compareDates);
        const playlistDateDownwards = playlistResult.sort(compareDates);
        return {
          ...state,
          sortedvideoResult: videoDateDownwards,
          sortedchannelResult: channelDateDownWards,
          sortedplaylistResult: playlistDateDownwards,
        };
      case "date-upwards":
        const videoDateUpwards = videoResult.sort(compareDates).reverse();
        const channelDateUpWards = channelResult.sort(compareDates).reverse();
        const playlistDateUpwards = playlistResult.sort(compareDates).reverse();
        return {
          ...state,
          sortedvideoResult: videoDateUpwards,
          sortedchannelResult: channelDateUpWards,
          sortedplaylistResult: playlistDateUpwards,
        };
      case "duration-downwards":
        const durationDownwards = videoResult.sort(compareDuration);
        return {
          ...state,
          sortedvideoResult: durationDownwards,
          sortedchannelResult: state.sortedchannelResult,
          sortedplaylistResult: state.sortedplaylistResult,
        };
      case "duration-upwards":
        const durationUpwards = videoResult.sort(compareDuration).reverse();
        return {
          ...state,
          sortedvideoResult: durationUpwards,
          sortedchannelResult: state.sortedchannelResult,
          sortedplaylistResult: state.sortedplaylistResult,
        };
      default:
        return state;
    }
  }

  const renderFilterPanel = () => {
    return (
      <>
        <div className="filter-panel">
          <div className="filter-panel__filter filter-panel__filter--short">
            <h4 className="filter-panel__title">Anzeigen</h4>
            <select
              name="video-type"
              id="video-type"
              className="filter-panel-select"
              onChange={selectFilterType}
            >
              <option value="all">Alle</option>
              <option value="videos">Videos</option>
              <option value="playlists">Playlisten</option>
              <option value="channel">Channels</option>
            </select>
          </div>
          <div className="filter-panel__filter filter-panel__filter--short">
            <h4 className="filter-panel__title">Sortieren</h4>
            <select
              name="video-type"
              id="video-type"
              className="filter-panel-select"
              onChange={selectSortType}
            >
              <option value="date-downwards">
                Veröffentlichungsdatum &#x25BC;
              </option>
              <option value="date-upwards">
                Veröffentlichungsdatum &#x25B2;
              </option>
              <option value="duration-downwards">Länge &#x25BC;</option>
              <option value="duration-upwards">Länge &#x25B2;</option>
            </select>
          </div>

          <div className="filter-panel__filter filter-panel__filter--long">
            <h4 className="filter-panel__title">Kategorien</h4>
            <div className="filter-panel__controller">
              <div className="filter-panel__category-option">
                <CategoryCheckbutton category="study" />
              </div>
              <div className="filter-panel__category-option">
                <CategoryCheckbutton category="class" />
              </div>
              <div className="filter-panel__category-option">
                <CategoryCheckbutton category="campus" />
              </div>
              <div className="filter-panel__category-option">
                <CategoryCheckbutton category="research" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderResults = () => {
    console.log(channelResult, "channels panel");
    return (
      <>
        {filterType === "all" || filterType === "videos" ? (
          <div className="container-90">
            <h3 className="result-headline">Videos</h3>
            <ThumbnailGrid
              type="video"
              elements={state.sortedvideoResult}
              columnNumber={4}
            />
            {videoResult.length < 1 && <NoContent content="video" />}
          </div>
        ) : null}
        {filterType === "all" && (
          <div className="filter-panel__divider container-90" />
        )}

        {filterType === "all" || filterType === "playlists" ? (
          <div className="container-90">
            <h3 className="result-headline">Playlists</h3>
            <ThumbnailGrid
              type="playlist"
              columnNumber={4}
              elements={state.sortedplaylistResult}
            />
            {playlistResult.length < 1 && <NoContent content="playlist" />}
          </div>
        ) : null}
        {filterType === "all" && (
          <div className="filter-panel__divider container-90" />
        )}
        {filterType === "all" || filterType === "channel" ? (
          <div className="container-90">
            <h3 className="result-headline">Channels</h3>
            <ThumbnailGrid
              type="channel"
              columnNumber={3}
              elements={state.sortedchannelResult}
            />
            {channelResult.length < 1 && <NoContent content="channel" />}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      {renderFilterPanel()}
      {renderResults()}
      <DiscoverCard />
    </>
  );
};

export default VideoFilterPanel;
