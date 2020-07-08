import React, { useContext } from "react";
import ChannelOverview from "../../components/reusables/ChannelOverview";

import LiveInfoLayer from "../../components/reusables/LiveInfoLayer";
import DiscoverCard from "../../components/reusables/DiscoverCard";
import Button from "../../components/reusables/Button";
import { Link } from "react-router-dom";
import MultiCarousel from "../../components/reusables/MutliCarousel";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import { DataContext } from "../../api/DataContext";
import NoContent from "../../components/reusables/NoContent";

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
          <MultiCarousel isPlaylist />
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
            videos={recommendedVideos}
            headline={"Empfehlungen der Woche"}
          />
          <MultiCarousel videos={newestVideos} headline={"Neuste Videos"} />
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
