import React, { useState, useEffect, useContext } from "react";
import VideoFilterPanel from "../../components/reusables/VideoFilterPanel";
import SearchNoResults from "./SearchNoResults";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import { useLocation } from 'react-router-dom'
import { showTags } from "../../utils";
import { DataContext } from "../../api/DataContext";

const Search = () => {
  const [ taggedVideos, setTaggedVideos ] = useState([])
  const [result, setResult] = useState(0);
  const [modified, setModified] = useState(false);

  const { videoResult, channelResult, playlistResult, query, recommendedVideos} = useContext(DataContext)

  const location = useLocation()


  useEffect(() => {
    const fetchTags = async () => {
      let mappedUrl =  location.state.tag.split(' ').join('%20')
      
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
  },[location.state, videoResult]);

  useEffect(() => {
    if ( videoResult !== null && playlistResult !== null && channelResult !== null) {
      const resultLength =
      videoResult.length + channelResult.length + playlistResult.length;
    setResult(resultLength);
    }
    else {
      setResult(taggedVideos.length)
    }

  }, [videoResult, channelResult, playlistResult]);

  useEffect(() => {
    if (
      videoResult.length > 0||
      playlistResult.length > 0||
      channelResult.length > 0 || 
      taggedVideos.length > 0
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
  }, [videoResult, channelResult, playlistResult]);

  if ( videoResult.length || channelResult.length|| playlistResult.length)
   {
    console.log(channelResult, 'channels search')
    console.log(videoResult, 'videos search')
    console.log(playlistResult, 'playlists search')
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
  if (recommendedVideos.length < 1) {
    return <ActivityIndicator />;
  }
  return <SearchNoResults  />;
};

export default Search;
