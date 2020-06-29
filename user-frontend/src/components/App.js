import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "../routes/aboutus/AboutUs";
import Playlists from "../routes/playlists/Playlists";
import Playlist from "../routes/playlists/Playlist";
import Video from "../routes/video/Video";
import Channel from "../routes/channel/Channel";
import Channels from "../routes/channel/Channels";
import Home from "../routes/home/Home";
import Search from "../routes/search/Search";
import "./styles.sass";
import Footer from "./reusables/Footer";
import Live from "../routes/live/Live";
import Navbar from "./reusables/Navbar";
import { BASEURL } from "../api";
import axios from "axios";
import { doSearch, showTags, compareDates } from "../utils";
import Discover from "../routes/discover/Discover";
import VideoServices from "../routes/video-services/VideoServices";
import NotFound from "../routes/404/NotFound";
import MultiCarousel from "./reusables/MutliCarousel";
import { comparePostions } from '../utils'

const App = () => {
  const [channels, setChannels] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [newestVideos, setNewestVideos ] = useState([])
  const [mainslider, setMainslider] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setURL] = useState("");
  const [videoResult, setVideoResult] = useState([]);
  const [channelResult, setChannelResult] = useState([]);
  const [playlistResult, setPlaylistResult] = useState([]);

  const resetTheme = () => {
    console.log('remove Theme')
    localStorage.removeItem('theme')
  }

  useEffect(() => {
    const fetchData = async () => {
      // get every existing channel which is public
      try {
        const response = await axios.get(
          BASEURL +
            "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}"
        );
        const {channels } = response.data.data
        const filteredChannels = channels.filter((channel) => {
          return channel.ispublic;
        });
        setChannels(filteredChannels);
      } catch (error) {
        console.log(error);
      }
      
      // get every existing playlist
      try {
        const response = await axios.get(
          BASEURL +
            "/graphql?query={categories{name, description, created, imagepath, iconpath _id}}"
        );
        const {categories } = response.data.data
        setPlaylists(categories);
      } catch (error) {
        console.log(error);
      }
      // get every mainslider + slider (further + recommended videos)
      try {
        const slider = await axios.get(
          `${BASEURL}/graphql?query={sliders{name, position, occurrence, active, videos{position, _id{name, posterImagePath, _id, videoDuration, created }}}}`
        );
        const mainslider = await axios.get(`${BASEURL}/slider`);
        mainslider.data.sort(comparePostions);
        slider.data.data.sliders.sort(comparePostions);
        slider.data.data.sliders.forEach((slider, index) => {
          slider.videos.sort(comparePostions);
        });

        let recommendedVideos = slider.data.data.sliders.filter(
          (slider) => slider.name === "Empfohlene Videos"
        );
        recommendedVideos = recommendedVideos[0].videos;
        let filteredRecommendedVideos = recommendedVideos.map(
          (video) => video._id
        );

        let newestVideos = await axios.get(
            `${BASEURL}/graphql?query={videos{_id, name, posterImagePath, created, status, access, views, videoDuration, categories{name, description, created, imagepath, iconpath _id}}}`
          );

        newestVideos = newestVideos.data.data.videos.sort(compareDates).reverse().splice(0,10)
        console.log(newestVideos, 'newst shit')
        setVideoData(filteredRecommendedVideos);
        setNewestVideos(newestVideos)
        setMainslider(mainslider.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log('useFetch ist rendered')
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      const url = getURL();
      if (url.completeURL.includes("tag=")) {
        const searchData = await showTags(url.splittedURL);
        setVideoResult(searchData[1]);
      } else {  
        const searchData = await doSearch(url.splittedURL, channels, playlists);
        setQuery(searchData[0]);
        setVideoResult(searchData[1]);
        setChannelResult(searchData[2]);
        setPlaylistResult(searchData[3]);
      }
      setURL(url.splittedURL);
    };
    fetchRoute();
  }, [channels, playlists, query, url.splittedURL]);

  // reeset the stored theme if user toggles preffered mode on his system
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(resetTheme)

    // function (e) {
    //   console.log(`changed to ${e.matches ? "dark" : "light"} mode`)
    // });
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeListener(resetTheme)
    }
  }, [])

  const getURL = () => {
    const location = window.location.pathname;
    const url = location.split("=").pop();
    return {completeURL: location, splittedURL: url};
  };

  const getQuery = (query) => {
    setQuery(query);
  };

  return (
    <Router>
      {<MultiCarousel videos={mainslider} isHeader getQuery={getQuery} />}
      <Navbar getQuery={getQuery} />
      <Switch>
        <Route path={"/aboutus"} component={AboutUs} />
        <Route
          exact
          path={"/playlist"}
          component={() => <Playlists playlistData={playlists} />}
        />
        <Route exact path={"/playlist/:id"} component={Playlist} />
        <Route exact path={"/video/:id"} component={Video} />

        <Route
          exact
          path={"/channel/"}
          component={() => (
            <Channels channelData={channels} videoData={videoData} />
          )}
        />
        <Route path={"/channel/:id"} component={Channel} />

        <Route
          exact
          path={"/"}
          component={() => (
            <Home channelData={channels} playlistData={playlists} recommendedVideos={videoData} newestVideos={newestVideos} />
          )}
        />

        <Route
          exact
          path={"/search/:id"}
          component={() => (
            <Search
              playlistData={playlists}
              videoResult={videoResult}
              channelResult={channelResult}
              playlistResult={playlistResult}
              query={query}
              getQuery={getQuery}
              classicVideos={videoData}
            />
          )}
        />

        <Route exact path={"/video-services"} component={VideoServices} />
        <Route
          exact
          path={"/live"}
          component={(rest) => <Live classicVideos={videoData} {...rest} />}
        />
        <Route exact path={"/discover"} component={Discover} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
