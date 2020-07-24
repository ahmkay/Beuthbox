import React, { useContext, useState, useLayoutEffect} from "react";
import Illustration from "../../assets/img/Illustration_Suche.svg";
import Searchbar from "../../components/reusables/Searchbar";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../api/DataContext";


const TABLET_BREAKPOINT = 835
const SearchNoResults = () => {
  const [isTablet, setIsTablet ] = useState(window.innerWidth <= TABLET_BREAKPOINT  )
  const { setQuery, recommendedVideos } = useContext(DataContext);

  const history = useHistory();
  const showSearchResult = (query) => {
    history.push(`/search/name=${query}`);
  };

  const getScreenWidth = () => {    
    setIsTablet(window.innerWidth <= TABLET_BREAKPOINT)
  }

  useLayoutEffect(() => {
    getScreenWidth()
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', getScreenWidth)

    return () => {
      window.removeEventListener('resize', getScreenWidth,

      )
    }
  }, [window.innerWidth])

  const evaluateSearch = async (event, value) => {
    const { key, type } = event;

    let trimmedValue = value.trim();

    if (key === "Enter") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }

      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    } else if (type === "click") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }
      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    }
  };

  return (
    <div className="search-no-results">
      <div className="container-50 search-no-results__container">
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
        <Searchbar eventHandler={evaluateSearch} type="grey" hasRef extraButton={isTablet} />
      </div>
      {recommendedVideos.length > 0 && (
        <>
          <h3 className="search-no-results__headline-classics">
            Oder schaue einen unserer Klassiker
          </h3>
          <div className="container-60 search-no-results__video-container">
            <ThumbnailGrid
              columnNumber={3}
              elements={recommendedVideos}
              type='video'
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchNoResults;
