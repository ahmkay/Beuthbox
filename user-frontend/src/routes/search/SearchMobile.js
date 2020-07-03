import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Rocket from "../../assets/img/icons/Icon_Rocket.svg";
import X from "../../assets/img/icons/Icon_X.svg";
import Searchbar from "../../components/reusables/Searchbar";
import Button from "../../components/reusables/Button";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

const SearchMobile = ({ getQuery, show, state, toggleShow }) => {
  const transitionDuration = 400;
  const { pathname } = useLocation();
  const history = useHistory();

  const defaultStyle = {
    transition: `top ${transitionDuration}ms cubic-bezier(0.13, 0.99, 0.63, 1)`,
  };

  // entered: 100vh + the height of the navbar --> 100% because its the relative container...
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
                toggleShow();
              }}
            >
              <img src={Rocket} />
              Entdecken
            </Button>
            <Button
              type="icon"
              onClick={() => {
                toggleShow();
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
