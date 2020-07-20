import React, { useContext } from "react";
import ChannelOverview from "../../components/reusables/ChannelOverview";
import { DataContext } from "../../api/DataContext";
import NoContent from "../../components/reusables/NoContent";

const Channels = () => {
  const { channelData } = useContext(DataContext);

  return (
    <main className="main">
      <header className="section-header">
        <h1 className="page-headline">Channels</h1>
      </header>
      <section className="main__section">
        <ChannelOverview
          channelData={channelData}
          channelInfo="Entdecke die vorgestellten neuen Channels der Fachbereiche und Studiengänge"
        />
      </section>
    </main>
  );
};

export default Channels;
