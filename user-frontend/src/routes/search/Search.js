import React, { useState, useEffect, useContext } from "react";
import VideoFilterPanel from "../../components/reusables/VideoFilterPanel";
import SearchNoResults from "./SearchNoResults";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import { useLocation } from "react-router-dom";
import { showTags } from "../../utils";
import { DataContext } from "../../api/DataContext";

const Search = ({
  videoResult,
  playlistResult,
  channelResult,
  recommendedVideos,
}) => {
  const [taggedVideos, setTaggedVideos] = useState([]);
  const [taggedQuery, setTaggedQuery] = useState([]);
  const [result, setResult] = useState(0);
  const [modified, setModified] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(true);

  const location = useLocation();

  const { query } = useContext(DataContext)

  useEffect(() => {
    const fetchTags = async () => {
      const { tag } = location.state
      let [query, filteredVideos] = await showTags(tag);
      await setTaggedVideos(filteredVideos);
      setTaggedQuery(query)
      setShowSearchResult(false);
      setModified(true);
    };
    if (location.state) {
      setModified(false);
      fetchTags();
    }
  }, [location.state]);

  useEffect(() => {
    const resultLength = taggedVideos.length
      ? taggedVideos.length
      : videoResult.length + channelResult.length + playlistResult.length;
    setResult(resultLength);
  }, [videoResult, channelResult, playlistResult, taggedVideos]);

  useEffect(() => {
    if (
      videoResult.length > 0 ||
      playlistResult.length > 0 ||
      channelResult.length > 0 ||
      taggedVideos.length > 0
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
  });

  if (
    (videoResult.length > 0 ||
      channelResult.length > 0 ||
      playlistResult.length > 0) &&
    showSearchResult
  ) {
    console.log(channelResult, "channels search");
    console.log(videoResult, "videos search");
    console.log(playlistResult, "playlists search");
    return (
      <main className="main">
        <h2 className="search-headline">
          Die Suche nach <span className="search-result">{query} </span> <br />{" "}
          ergab <span className="search-result">{result}</span> Treffer
        </h2>

        <VideoFilterPanel
          videoResult={videoResult}
          playlistResult={playlistResult}
          channelResult={channelResult}
        />
      </main>
    );
  }

  if (taggedVideos.length > 0 && modified) {
    return (
      <div className="main">
        <h2 className="search-headline">
          Die Suche nach dem Tag <span className="search-result">{taggedQuery} </span> <br />{" "}
          ergab <span className="search-result">{result}</span> Treffer
        </h2>

        <VideoFilterPanel
          videoResult={taggedVideos}
          playlistResult={playlistResult}
          channelResult={channelResult}
        />
      </div>
    );
  }
  if (recommendedVideos.length < 1) {
    return (
      <div>
        {" "}
        <ActivityIndicator position="inline" />{" "}
      </div>
    );
  }
  return <SearchNoResults />;
};

export default Search;
