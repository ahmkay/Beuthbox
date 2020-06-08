import React, { useState, useEffect } from "react";
import VideoFilter from "../../components/reusables/VideoFilter";

const Search = ({ videoResult, channelResult, playlistResult, query }) => {
  const [result, setResult] = useState(0);
  useEffect(() => {
    const resultLength =
      videoResult.length + channelResult.length + playlistResult.length;
    setResult(resultLength);
  });
  if (videoResult && channelResult && playlistResult) {
    return (
      <div className="root-container">
        <h2 className='search-headline'>
          Die Suche nach <span className="search-result">{query} </span> <br/> ergab{" "}
          <span className="search-result">{result}</span> Treffer
        </h2>

        <VideoFilter
          videoResult={videoResult}
          playlistResult={playlistResult}
          channelResult={channelResult}
        />
      </div>
    );
  }
  return <div>Keine Daten</div>;
};

export default Search;
