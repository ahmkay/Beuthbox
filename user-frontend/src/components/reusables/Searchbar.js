import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Searchbar = ({ eventHandler, type }) => {
  const [inputValue, setInputValue] = useState("");
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
      />
      <SearchIcon
        className={`searchbar__icon--${type}`}
        onClick={(event) => eventHandler(event, inputValue)}
      />
    </div>
  );
};

export default Searchbar;
