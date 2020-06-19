import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import ChannelOverview from "../../components/reusables/ChannelOverview";
import PlaylistsCarousel from "../../components/reusables/PlaylistsCarousel";
import VideoRow from "../../components/reusables/VideoRow";
import LiveInfoLayer from "../../components/LiveInfoLayer";
import DiscoverCard from "../../components/reusables/DiscoverCard";
import Button from "../../components/reusables/Button";
import { Link } from "react-router-dom";

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactFlowPlayer from "react-flow-player";

const Home = ({ channelData, playlistData }) => {
  const [sliders, setSliders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [furtherVideos, setFurtherVideos] = useState([]);
  const [mainslider, setMainslider] = useState([]);
  

  useEffect(() => {
    function compare(a, b) {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    }
    const fetchData = async () => {
      try {
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

        setRecommendations(filteredRecommendedVideos);
        setFurtherVideos(filteredFurtherVideos);
        setSliders(slider.data.data.sliders);
        setMainslider(mainslider.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // owl carousel

  if (sliders && recommendations) {
    return (
      <main className="main">
        <LiveInfoLayer />
        <ChannelOverview
          channelData={channelData}
          channelInfo="Test Info Beschreibung"
        />
        <div className="link__container-channels">
          <Link to={"/channel"}>
            <Button>Alle Channels</Button>{" "}
          </Link>
        </div>
        <section className="main__section">
          <header className="section-header">
            <h1>Playlists</h1>
            <h2 className="section-header__description">
              Entdecke die Sammlung der neusten Playlisten
            </h2>
          </header>
          <PlaylistsCarousel playlists={playlistData} />
          <div className="link__container-playlist">
            <Link to={"/playlist"}>
              <Button>Alle Playlisten</Button>{" "}
            </Link>
          </div>
        </section>
        <section className="main__section">
          <header className="section-header">
            <h1>Videos</h1>
            <h2 className="section-header__description">
              Schaue dir unsere Empfehlungen der spannensten und interessanten
              Videos der beuthBOX an{" "}
            </h2>
          </header>
          <VideoRow
            headline={"Empfehlungen der Woche"}
            amountOfVideos={4}
            videos={recommendations}
          />
          <VideoRow
            headline={"Neuste Videos"}
            amountOfVideos={4}
            videos={furtherVideos}
          />
        </section>
        <section className="main__section">
          <DiscoverCard />
        </section>
      </main>
    );
  }
  return <div>Home</div>;
};

export default Home;
