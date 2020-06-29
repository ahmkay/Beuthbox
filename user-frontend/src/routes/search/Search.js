import React, { useState, useEffect } from "react";
import VideoFilterPanel from "../../components/reusables/VideoFilterPanel";
import SearchNoResults from "./SearchNoResults";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import { useLocation } from 'react-router-dom'
import { showTags } from "../../utils";

const Search = ({
  videoResult,
  channelResult,
  playlistResult,
  query,
  getQuery,
  classicVideos,
}) => {
  const [ taggedVideos, setTaggedVideos ] = useState([])
  const [result, setResult] = useState(0);
  const [modified, setModified] = useState(false);

  const location = useLocation()


  useEffect(() => {
    const fetchTags = async () => {
      let mappedUrl =  location.state.tag.split(' ').join('%20')
      console.log(mappedUrl)
      
     let videoResult = await showTags(mappedUrl)
     let filteredVideos = await [... videoResult[1]]
     await setTaggedVideos(filteredVideos)
     setModified(true)
      console.log(videoResult[1], 'taggeVideos')
  


    }
    if (location.state) {
      setModified(false)
      fetchTags()
  }
  else {
    console.log(videoResult, 'videResult found')
  }
  },[location.state, videoResult]);

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
    videoResult.length > 0  ||
    channelResult.length > 0 ||
    playlistResult.length > 0
  ) {
    return (
      <div className="root-container">
        <h2 className="search-headline">
          Die Suche nach <span className="search-result">{query} </span> <br />{" "}
          ergab <span className="search-result">{result}</span> Treffer
        </h2>

        <VideoFilterPanel
          videoResult={videoResult}
          playlistResult={playlistResult}
          channelResult={channelResult}
        />
      </div>
    );
  }

  if(taggedVideos.length > 0 && modified) {
    return (
      <div className="root-container">
      <h2 className="search-headline">
        Die Suche nach <span className="search-result">{query} </span> <br />{" "}
        ergab <span className="search-result">{result}</span> Treffer
      </h2>

      <VideoFilterPanel
        videoResult={taggedVideos}
        playlistResult={playlistResult}
        channelResult={channelResult}
      />
    </div>
    )
  }
  if (classicVideos.length < 1) {
    return <ActivityIndicator />;
  }
  return <SearchNoResults getQuery={getQuery} classicVideos={classicVideos} />;
};

export default Search;
