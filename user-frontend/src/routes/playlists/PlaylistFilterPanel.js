import React, {useState, useReducer, useEffect } from 'react';
import { compareDuration, compareDates } from "../../utils";
import VideoRow from "../../components/reusables/VideoRow";
import CategoryCheckbutton from "../../components/reusables/CategoryCheckbutton";
import VideoGrid from '../../components/reusables/VideoGrid';

const PlaylistFilterPanel = ({ videoResult }) => {
    const [sort, setSort] = useState("date-downwards");
  
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
    };
    const [state, dispatch] = useReducer(reducer, initialState );
  
    function reducer(state, action) {
      switch (action.type) {
        case "date-downwards":
          const videoDateDownwards = videoResult.sort(compareDates);
          return {
            ...state,
            sortedvideoResult: videoDateDownwards,
          };
        case "date-upwards":
          const videoDateUpwards = videoResult.sort(compareDates).reverse();
          return {
            ...state,
            sortedvideoResult: videoDateUpwards,
          };
        case "duration-downwards":
          const durationDownwards = videoResult.sort(compareDuration);
          return {
            ...state,
            sortedvideoResult: durationDownwards,
          };
        case "duration-upwards":
          const durationUpwards = videoResult.sort(compareDuration).reverse();
          return {
            ...state,
            sortedvideoResult: durationUpwards,
          };
        default:
          return state;
      }
    }
  
    const renderFilterPanel = () => {
      return (
        <>
          <div className="filter-panel">
            <div className="filter-panel__filter-playlist filter-panel__filter-playlist--short">
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
  
            <div className="filter-panel__filter-playlist filter-panel__filter-playlist--long">
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
      return (
        <>
          <VideoGrid videos={state.sortedvideoResult} columnNumber={3}/>
        </>
      );
    };
  
    return (
      <>
        {renderFilterPanel()}
        {renderResults()}
      </>
    );
  };
  
  export default PlaylistFilterPanel;
  