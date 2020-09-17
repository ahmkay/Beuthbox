import React, { useState, useEffect, useContext } from "react";
import X from "../../assets/img/icons/Icon_X.svg";
import Searchbar from "../../components/reusables/Searchbar";
import Button from "../../components/reusables/Button";
import { useLocation, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";
import { DataContext } from "../../api/DataContext";

const SearchTablet = ({ show, toggleShow }) => {
  const transitionDuration = 350;
  const history = useHistory();
  const [currentLocation, setCurrentLocation] = useState(useLocation());
  const { setQuery } = useContext(DataContext);

  useEffect(() => {
    // close search modal if search route was exited
    if (useLocation !== currentLocation) toggleShow(false);
  }, [useLocation()]);

  const defaultStyle = {
    transition: `top ${transitionDuration}ms cubic-bezier(0.21, 1.07, 0.8, 0.99), opacity ${transitionDuration}ms cubic-bezier(0.21, 1.07, 0.8, 0.99)`,
  };

  const transitionStyles = {
    entering: { top: "0", opacity: 0 },
    entered: { top: "100%", opacity: 1 },
    exiting: { top: "100%", opacity: 1 },
    exited: { top: "0", opacity: 0 },
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
        <div
          className="search-tablet"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Searchbar type="white" eventHandler={evaluateSearch} />
          <Button
            type="icon"
            onClick={() => {
              toggleShow(false);
            }}
          >
            <img src={X} />
          </Button>
        </div>
      )}
    </Transition>
  );
};

export default SearchTablet;
