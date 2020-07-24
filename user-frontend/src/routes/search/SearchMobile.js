import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Rocket from "../../assets/img/icons/Icon_Rocket.svg";
import X from "../../assets/img/icons/Icon_X.svg";
import Searchbar from "../../components/reusables/Searchbar";
import Button from "../../components/reusables/Button";
import { useLocation, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";
import { DataContext } from "../../api/DataContext";

const SearchMobile = ({ show, toggleShow }) => {
  const transitionDuration = 350;
  const history = useHistory();
  const [currentLocation, setCurrentLocation] = useState(useLocation());
  const { setQuery } = useContext(DataContext);

  useEffect(() => {
    // close seeatch modal if search route is entered
    if (useLocation !== currentLocation) toggleShow(false);
  }, [useLocation()]);

  const defaultStyle = {
    transition: `top ${transitionDuration}ms cubic-bezier(0.21, 1.07, 0.8, 0.99)`,
  };

  // entered: 100vh + 2 * the height of the navbar
  // exited: 100% because its the relative container...
  const transitionStyles = {
    entering: { top: "100vh" },
    entered: { top: "calc(-100vh + 100%)" },
    exiting: { top: 0 },
    exited: { top: "100%" },
  };

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
    <Transition in={show} appear={true}>
      {(state = state) => (
        <main
          className="main search-mobile"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="search-mobile__header">
            <SearchIcon className="search-mobile__icon" />
            <h1 className="search-mobile__title">Suche</h1>
          </div>
          <div className="search-mobile__body main__section--center">
            <Searchbar type="white" eventHandler={evaluateSearch} extraButton />
          </div>
          <div className="search-mobile__controls main__section">
            <Button
              type="icon"
              onClick={() => {
                history.push("/discover");
                toggleShow(false);
              }}
              className="search-mobile__button-discover"
            >
              <img src={Rocket} />
              Entdecken
            </Button>
            <Button
              type="icon"
              onClick={() => {
                toggleShow(false);
              }}
            >
              <img src={X} />
            </Button>
          </div>
        </main>
      )}
    </Transition>
  );
};

export default SearchMobile;
