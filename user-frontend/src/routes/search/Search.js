import React, { useState, useEffect } from "react";
import VideoFilter from "../../components/reusables/VideoFilter";
import SearchNoResults from "./SearchNoResults";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Search = ({
  videoResult,
  channelResult,
  playlistResult,
  query,
  getQuery,
  classicVideos,
}) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    const resultLength =
      videoResult.length + channelResult.length + playlistResult.length;
    setResult(resultLength);
  });

  useEffect(() => {
    if (
      videoResult.length > 0 ||
      playlistResult.length > 0 ||
      channelResult.length > 0
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
  });

  if (
    videoResult.length > 0 ||
    channelResult.length > 0 ||
    playlistResult.length > 0
  ) {
    return (
      <div className="root-container">
        <h2 className="search-headline">
          Die Suche nach <span className="search-result">{query} </span> <br />{" "}
          ergab <span className="search-result">{result}</span> Treffer
        </h2>

        <VideoFilter
          videoResult={videoResult}
          playlistResult={playlistResult}
          channelResult={channelResult}
        />
      </div>
    );
  }
  if (classicVideos.length < 1) {
    return <ActivityIndicator />;
  }
  return <SearchNoResults getQuery={getQuery} classicVideos={classicVideos} />;
};

export default Search;