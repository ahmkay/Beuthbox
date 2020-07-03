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
import { doSearch } from "../utils";
import Discover from "../routes/discover/Discover";
import VideoServices from "../routes/video-services/VideoServices";
import NotFound from "../routes/404/NotFound";
import MultiCarousel from "./reusables/MutliCarousel";

const App = () => {
  const [channels, setChannels] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [mainslider, setMainslider] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setURL] = useState("");
  const [videoResult, setVideoResult] = useState([]);
  const [channelResult, setChannelResult] = useState([]);
  const [playlistResult, setPlaylistResult] = useState([]);

  const resetTheme = () => {
    console.log("remove Theme");
    localStorage.removeItem("theme");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASEURL +
            "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}"
        );
        const channels = response.data.data.channels.filter((channel) => {
          return channel.ispublic;
        });
        setChannels(channels);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
          BASEURL +
            "/graphql?query={categories{name, description, created, imagepath, iconpath _id}}"
        );
        setPlaylists(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }

      try {
        function compare(a, b) {
          if (a.position < b.position) return -1;
          if (a.position > b.position) return 1;
          return 0;
        }

        const slider = await axios.get(
          `${BASEURL}/graphql?query={sliders{name, position, occurrence, active, videos{position, _id{name, posterImagePath, _id, videoDuration, created }}}}`
        );
        const mainslider = await axios.get(`${BASEURL}/slider`);
        mainslider.data.sort(compare);
        slider.data.data.sliders.sort(compare);
        slider.data.data.sliders.forEach((slider, k) => {
          slider.videos.sort(compare);
        });

        let recommendedVideos = slider.data.data.sliders.filter(
          (slider) => slider.name === "Empfohlene Videos"
        );
        recommendedVideos = recommendedVideos[0].videos;
        let filteredRecommendedVideos = recommendedVideos.map(
          (video) => video._id
        );

        let furtherVideos = slider.data.data.sliders.filter(
          (slider) => slider.name === "Sonstige Videos"
        );
        furtherVideos = furtherVideos[0].videos;
        let filteredFurtherVideos = furtherVideos.map((video) => video._id);

        setVideoData(filteredRecommendedVideos);
        setMainslider(mainslider.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      const url = getURL();
      const searchData = await doSearch(url, channels, playlists);
      setQuery(searchData[0]);
      setVideoResult(searchData[1]);
      setChannelResult(searchData[2]);
      setPlaylistResult(searchData[3]);
      setURL(url);
    };
    fetchRoute();
  }, [channels, playlists, query, url]);

  // reeset the stored theme if user toggles preffered mode on his system
  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addListener(resetTheme);

    // function (e) {
    //   console.log(`changed to ${e.matches ? "dark" : "light"} mode`)
    // });
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeListener(resetTheme);
    };
  }, []);

  const getURL = () => {
    const location = window.location.pathname;
    const url = location.split("=").pop();
    return url;
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
            <Home channelData={channels} playlistData={playlists} />
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
