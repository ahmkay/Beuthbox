import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Searchbar = ({ eventHandler, type, hasRef }) => {
  const searchbarRef = useRef(null)
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (searchbarRef && searchbarRef.current !== null) {
      window.scrollTo({x: 0, y: '40vh', behavior: "smooth"})
      searchbarRef.current.focus()
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
      <SearchIcon
        className={`searchbar__icon--${type}`}
        onClick={(event) => eventHandler(event, inputValue)}
      />
    </div>
  );
};

export default Searchbar;
