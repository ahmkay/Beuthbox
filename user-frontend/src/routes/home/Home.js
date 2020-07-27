import React, { useContext } from "react";
import ChannelOverview from "../../components/reusables/ChannelOverview";
import LiveInfoLayer from "../../components/reusables/LiveInfoLayer";
import DiscoverCard from "../../components/reusables/DiscoverCard";
import Button from "../../components/reusables/Button";
import { Link } from "react-router-dom";
import MultiCarousel from "../../components/reusables/MutliCarousel";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import { DataContext } from "../../api/DataContext";

const Home = () => {
  const {
    channelData,
    playlistData,
    newestVideos,
    recommendedVideos,
  } = useContext(DataContext);

  if (
    newestVideos.length > 0 &&
    recommendedVideos.length > 0 &&
    channelData.length > 0 &&
    playlistData.length > 0
  ) {
    return (
      <main className="main">
        <LiveInfoLayer />
        <section className="main__section recommended-video-container">
          <header className="section-header">
            <h2 className="section-header__description">
              Schaue dir unsere Empfehlungen der spannensten und interessanten
              Videos der beuthBOX an{" "}
            </h2>
          </header>
          <MultiCarousel
            elements={recommendedVideos}
            headline={"Empfehlungen der Woche"}
            type='video'
          />
          <MultiCarousel
            elements={newestVideos}
            type="video"
            headline={"Neuste Videos"}
          />
        </section>
        <ChannelOverview
          channelData={channelData.slice(0, 4)}
          channelInfo="Entdecke die vorgestellten Channels der Fachbereiche und Studiengänge"
        />
        <section className="main__section">
          <header className="section-header">
            <h2 className="section-header__description">
              Entdecke die Sammlung der neusten Playlists
            </h2>
          </header>
          <MultiCarousel type="playlist" elements={playlistData} />
          <div className="all-media-link">
            <Link to={"/playlist"}>
              <Button>Alle Playlisten</Button>{" "}
            </Link>
          </div>
        </section>
        <section className="main__section">
          <DiscoverCard />
        </section>
      </main>
    );
  }
  return <ActivityIndicator />;
};

export default Home;
