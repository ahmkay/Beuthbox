import React, { useContext } from "react";

import ChannelOverview from "../../components/reusables/ChannelOverview";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Channels = () => {
  const { channelData } = useContext(DataContext);

  if (channelData.length) {
    return (
      <main className="main">
        <section className="main__section">
          <ChannelOverview
            channelData={channelData}
            channelInfo="Entdecke die vorgestellten neuen Channels der Fachbereiche und Studiengänge"
          />
        </section>
      </main>
    );
  }
  return (
    <div>
      <ActivityIndicator position="inline" />
    </div>
  );
};

export default Channels;
