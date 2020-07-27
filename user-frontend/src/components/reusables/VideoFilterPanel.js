import React, { useState, useReducer, useEffect } from "react";
import { compareDuration, compareDates, getDeviceBreakpoints } from "../../utils";
import ThumbnailGrid from "./ThumbnailGrid";
import CategoryCheckbutton from "./CategoryCheckbutton";
import DiscoverCard from "./DiscoverCard";
import NoContent from "./NoContent";
import TuneIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/Close';
import CategoryIcon from "./CategoryIcon";
import SecondaryButton from "./SecondaryButton";

const VideoFilterPanel = ({ videoResult, channelResult, playlistResult }) => {
  const { innerWidth } = window;
  const [filterType, setFilterType] = useState("all");
  const [sort, setSort] = useState("date-downwards");
  const [showFilterButton, setShowFilterButton] = useState(getDeviceBreakpoints(innerWidth).isMobile);
  const [breakpoint, setBreakpoint] = useState(getDeviceBreakpoints(innerWidth))
  const { isMobile, isTablet, isDesktop, isDektopExtended } = breakpoint

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


  useEffect(() => {
    const getScreenWidth = () => {
      setBreakpoint(getDeviceBreakpoints(window.innerWidth))
    }
    window.addEventListener('resize', getScreenWidth)
    getScreenWidth()

    return () => {
      window.removeEventListener('resize', getScreenWidth,

      )
    }
  }, [])


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

  const toggleFilterButton = () => {
    setShowFilterButton(!showFilterButton)
  }

  const renderCategoryButtons = () => {
    if (isDektopExtended && !isMobile) {
      return (
        <>
          <div className='filter-panel__category-container--mobile'>
            <div className="filter-panel__category-option">
              <CategoryCheckbutton category="study" />
            </div>
            <div className="filter-panel__category-option">
              <CategoryCheckbutton category="class" />
            </div>
          </div>
          <div className='filter-panel__category-container--mobile'>
            <div className="filter-panel__category-option">
              <CategoryCheckbutton category="campus" />
            </div>
            <div className="filter-panel__category-option">
              <CategoryCheckbutton category="research" />
            </div>
          </div>
        </>
      )
    } else if (isMobile) {
      return (
        <>
          <CategoryIcon category="research" isActive type="labeled" />
          <CategoryIcon category="campus" isActive type="labeled" />
          <CategoryIcon category="study" isActive type="labeled" />
          <CategoryIcon category="class" isActive type="labeled" />
        </>
      )
    }

    else {
      return (
        <>
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
        </>
      )
    }

  }

  const renderFilterPanel = () => {
    if (isTablet && !isMobile) {
      return (
        <>
          <div className='filter-panel--tablet'>
            <div className='filter-panel--tablet__closeLayer'>
              <h2 className='filter-panel--tablet__closeLayer-title'>Filtern</h2>
            </div>

            <h4 className="filter-panel--tablet__title">Anzeigen</h4>
            <select
              name="video-type"
              id="video-type"
              className="filter-panel--tablet__select"
              onChange={selectFilterType}
            >
              <option value="all">Alle</option>
              <option value="videos">Videos</option>
              <option value="playlists">Playlisten</option>
              <option value="channel">Channels</option>
            </select>

            <h4 className="filter-panel--tablet__title">Sortieren</h4>
            <select
              name="video-type"
              id="video-type"
              className="filter-panel--tablet__select"
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

            <h4 className="filter-panel--tablet__title">Kategorie</h4>
            <div className='filter-panel--tablet__category-container'>
              {renderCategoryButtons()}
            </div>
          </div>
        </>

      )
    }

    else if (!isTablet) {
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
            {isDektopExtended ?
              <div className="filter-panel__filter filter-panel__filter--long">
                <h4 className="filter-panel__title">Kategorien</h4>
                <div className="filter-panel__controller">
                  <div className='filter-panel__category-container--mobile'>
                    <div className="filter-panel__category-option">
                      <CategoryCheckbutton category="study" />
                    </div>
                    <div className="filter-panel__category-option">
                      <CategoryCheckbutton category="class" />
                    </div>
                  </div>
                  <div className='filter-panel__category-container--mobile'>
                    <div className="filter-panel__category-option">
                      <CategoryCheckbutton category="campus" />
                    </div>
                    <div className="filter-panel__category-option">
                      <CategoryCheckbutton category="research" />
                    </div>
                  </div>
                </div>
              </div>
              :
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
            }
          </div>
        </>
      )
    }
    else if (isMobile) {
      return (
        showFilterButton ?
          // <div className='filter-panel--mobile__button-container'>
          <SecondaryButton
            text={"Filter"}
            onClick={toggleFilterButton}
            icon={TuneIcon}
            additionalClasses="filter-button"
          ></SecondaryButton>
          // </div>
          :
          <>
            <div className='filter-panel--mobile__position-container' id='anchor-point'>
              <div className='filter-panel--mobile__element-container'>
                <div className='filter-panel--tablet__closeLayer'>
                  <h2 className='filter-panel--tablet__closeLayer-title'>Filtern</h2>
                  < CloseIcon className='filtr-panel--tablet__close-icon' onClick={toggleFilterButton} />
                </div>

                <h4 className="filter-panel--tablet__title">Anzeigen</h4>
                <select
                  name="video-type"
                  id="video-type"
                  className="filter-panel--tablet__select"
                  onChange={selectFilterType}
                >
                  <option value="all">Alle</option>
                  <option value="videos">Videos</option>
                  <option value="playlists">Playlisten</option>
                  <option value="channel">Channels</option>
                </select>

                <h4 className="filter-panel--tablet__title">Sortieren</h4>
                <select
                  name="video-type"
                  id="video-type"
                  className="filter-panel--tablet__select"
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

                <h4 className="filter-panel--tablet__title">Kategorie</h4>
                <div className='filter-panel--tablet__category-container'>
                  {renderCategoryButtons()}
                </div>
              </div>
            </div>
          </>

      )
    }

  };

  const renderResults = () => {
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
