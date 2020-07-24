import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "../routes/aboutus/AboutUs";
import Privacy from "../routes/privacy/Privacy";
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
import { doSearch, showTags, compareDates, comparePostions } from "../utils";
import Discover from "../routes/discover/Discover";
import VideoServices from "../routes/video-services/VideoServices";
import NotFound from "../routes/404/NotFound";
import MultiCarousel from "./reusables/MutliCarousel";
import { DataContext } from "../api/DataContext";

const App = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [newestVideos, setNewestVideos] = useState([]);
  const [mainslider, setMainslider] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setURL] = useState("");
  const [videoResult, setVideoResult] = useState([]);
  const [channelResult, setChannelResult] = useState([]);
  const [playlistResult, setPlaylistResult] = useState([]);
  const [activeLivestream, setActiveLivestream] = useState(false);

  const resetTheme = () => {
    console.log("remove Theme");
    localStorage.removeItem("theme");
  };

  useEffect(() => {
    const fetchData = async () => {
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

        let allVideos = await axios.get(
          `${BASEURL}/graphql?query={videos{_id, name, posterImagePath, created, description, status, access, views, videoDuration, videoPath, tags, categories{name, description, created, imagepath, _id}, channel{name, description, created, imagepath, _id}}}`
        );

        // sort videos by date and limit the amount to 10
        let newestVideos = allVideos.data.data.videos
          .sort((videoA, videoB) => compareDates(videoB, videoA))
          .splice(0, 10);

        setMainslider(mainslider.data);
        setRecommendedVideos(filteredRecommendedVideos);
        setNewestVideos(newestVideos);
        setAllVideos(allVideos.data.data.videos);
      } catch (error) {
        console.log(error);
      }
      // get every existing channel which is public
      try {
        const response = await axios.get(
          BASEURL +
            "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}"
        );
        const { channels } = response.data.data;
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
        const { categories } = response.data.data;
        setPlaylists(
          categories.sort((playlistA, playlistB) => {
            return compareDates(playlistB, playlistA);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log("useFetch ist rendered");
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
    return { completeURL: location, splittedURL: url };
  };

  return (
    <Router>
      <DataContext.Provider
        value={{
          recommendedVideos,
          setRecommendedVideos,
          newestVideos,
          channelData: channels,
          channelResult,
          setChannelResult,
          playlistData: playlists,
          playlistResult,
          setPlaylistResult,
          query,
          setQuery,
          url,
          mainslider,
          allVideos,
          videoResult,
          setVideoResult,
          activeLivestream,
          setActiveLivestream,
        }}
      >
        {<MultiCarousel isHeader />}
        <Navbar />
        <Switch>
          <Route exact path={"/aboutus"} component={AboutUs} />
          <Route exact path={"/privacy/"} component={Privacy} />
          <Route exact path={"/playlist"} component={Playlists} />
          <Route exact path={"/playlist/:id"} component={Playlist} />
          <Route exact path={"/video/:id"} component={Video} />
          <Route exact path={"/channel/"} component={Channels} />
          <Route path={"/channel/:id"} component={Channel} />
          <Route exact path={"/"} component={Home} />
          <Route
            exact
            path={"/search/:id"}
            component={() => (
              <Search
                videoResult={videoResult}
                playlistResult={playlistResult}
                channelResult={channelResult}
                query={query}
                recommendedVideos={recommendedVideos}
              />
            )}
          />
          <Route exact path={"/video-services"} component={VideoServices} />
          <Route exact path={"/live"} component={Live} />
          <Route exact path={"/discover"} component={Discover} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </DataContext.Provider>
    </Router>
  );
};

export default App;
