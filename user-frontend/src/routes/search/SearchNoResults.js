import React from "react";
import Illustration from "../../assets/img/Illutstration_Suche.svg";
import Searchbar from "../../components/reusables/Searchbar";
import { useHistory } from "react-router-dom";
import VideoRow from "../../components/reusables/VideoRow";

const SearchNoResults = ({ getQuery, classicVideos }) => {
  const history = useHistory();
  const showSearchResult = (query) => {
    history.push(`/search/name=${query}`);
  };

  const evaluateSearch = async (event, value) => {
    const { key, type } = event;

    let trimmedValue = value.trim();

    if (key === "Enter") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }

      getQuery(trimmedValue);
      showSearchResult(trimmedValue);
    } else if (type === "click") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }
      getQuery(trimmedValue);
      showSearchResult(trimmedValue);
    }
  };

  return (
    <div className="search-no-results">
      <div className="container-50">
        <img
          src={Illustration}
          alt="Illustration Kein Ergebnis"
          className="search-no-results__illustration"
        />
        <h2 className="search-no-results__headline">
          Kein Ergebnis :( <br />
          Probier's noch mal
        </h2>
      </div>
      <div className="search-no-results__searchbar-container container-50">
        <Searchbar eventHandler={evaluateSearch} type='grey'/>
      </div>
      {classicVideos.length > 0 &&
      <>
        <h3 className="search-no-results__headline-classics">
        Oder schaue einen unserer Klassiker
      </h3>
      <div className="container-60">
        <VideoRow
          amountOfVideos={3}
          videos={classicVideos}
          flexDirection="row"
        />
      </div>
      </>
      }
      
    </div>
  );
};

export default SearchNoResults;
