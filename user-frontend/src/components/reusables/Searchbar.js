import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Button from "./Button";

const Searchbar = ({ eventHandler, type, extraButton }) => {
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
