import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Button from "./Button";

const Searchbar = ({ eventHandler, type, hasRef, extraButton }) => {
  const searchbarRef = useRef(null)
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (searchbarRef && searchbarRef.current !== null) {
      searchbarRef.current.focus()
      // window.scrollTo({top: 300, left: 0,  behavior: "smooth"})
    }
  }, []);

  return (
    <div className="searchbar__container">
      <input
        className={`searchbar--${type}`}
        type="text"
        name="suche"
        value={inputValue}
        placeholder="Video, Playlist, Channel, Stichwort..."
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => eventHandler(event, inputValue)}
       {...hasRef ? {ref: searchbarRef} : null}
      />
      {!extraButton && (
        <SearchIcon
          className={`searchbar__icon--${type}`}
          onClick={(event) => eventHandler(event, inputValue)}
        />
      )}
      {extraButton && (
        <Button negative onClick={(event) => eventHandler(event, inputValue)}>
          Suchen
        </Button>
      )}
    </div>
  );
};

export default Searchbar;
