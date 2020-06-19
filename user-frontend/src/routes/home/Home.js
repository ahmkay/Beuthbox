import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import ChannelOverview from "../../components/reusables/ChannelOverview";

import LiveInfoLayer from "../../components/LiveInfoLayer";
import DiscoverCard from "../../components/reusables/DiscoverCard";
import Button from "../../components/reusables/Button";
import { Link } from "react-router-dom";
import MultiCarousel from "../../components/reusables/MutliCarousel";

const Home = ({ channelData, playlistData }) => {
  const [sliders, setSliders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [furtherVideos, setFurtherVideos] = useState([]);

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
          <MultiCarousel videos={playlistData} isPlaylist />
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

          <MultiCarousel
            videos={recommendations}
            headline={"Empfehlungen der Woche"}
          />
          <MultiCarousel videos={furtherVideos} headline={"Neuste Videos"} />
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
