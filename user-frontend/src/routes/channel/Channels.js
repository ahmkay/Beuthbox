import React, { useContext } from "react";
import ChannelOverview from "../../components/reusables/ChannelOverview";
import { DataContext } from "../../api/DataContext";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";

const Channels = () => {
  const { channelData } = useContext(DataContext);

  return (
    <main className="main">
      <header className="section-header">
        <h1 className="page-headline">Channels</h1>
      </header>
      <section className="main__section">
        <h2></h2>
        <ChannelOverview
          channelData={channelData.slice(0, 4)}
          channelInfo="Vorgestellte Channels der Fachbereiche und Studiengänge"
        />
      </section>
      <section className="main__section">
        <h2 className="section-header__headline">Übersicht</h2>
        <ThumbnailGrid type="channel" columnNumber={3} elements={channelData} />
      </section>
    </main>
  );
};

export default Channels;
