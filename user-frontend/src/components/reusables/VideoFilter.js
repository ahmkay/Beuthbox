import React, { useState, useReducer, useEffect, useContext } from "react";
import SchoolIcon from "@material-ui/icons/School";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as MagicIcon } from "../../assets/img/icons/magic.svg";
import { ReactComponent as IconBook } from "../../assets/img/icons/Icon_Book.svg";
import { compareDuration, compareDates } from "../../utils";
import VideoRow from "./VideoRow";
import PlaylistsCarousel from "./PlaylistsCarousel";
import ChannelOverview from "./ChannelOverview";
import CategoryCheckbutton from "./CategoryCheckbutton";

const VideoFilter = ({ videoResult, channelResult, playlistResult }) => {
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
      {filterType === "all" || filterType === "videos" ? (
        <div className="container-90">
          <VideoRow
            amountOfVideos={3}
            videos={state.sortedvideoResult}
            headline="Videos"
            flexDirection="row"
          />
          {videoResult.length < 1 && <p>Keine Videos gefunden</p>}
        </div>
      ) : null}
      {filterType === "all" || filterType === "playlists" ? (
        <div className="container-90">
          <h1>Playlists</h1>
          <PlaylistsCarousel playlists={state.sortedplaylistResult} />
          {playlistResult.length < 1 && <p>Keine Playlisten gefunden</p>}
        </div>
      ) : null}
      {filterType === "all" || filterType === "channel" ? (
        <div className="container-90">
          <ChannelOverview channelData={state.sortedchannelResult} />
          {channelResult.length < 1 && <p> Keine Channels gefunden</p>}
        </div>
      ) : null}
    </>
  );
};

export default VideoFilter;
