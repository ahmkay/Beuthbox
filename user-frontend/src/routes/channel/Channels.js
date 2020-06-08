import React from "react";

import ChannelOverview from "../../components/reusables/ChannelOverview";

const Channels = ({ channelData, videoData }) => {
  if (channelData) {
    return (
      <main className="main">
        <section className="main__section">
          <ChannelOverview
            channelData={channelData}
            channelInfo="Entdecke die vorgestellten neuen Channels der Fachbereiche und Studiengänge"
          />
          {/* <VideoFilter videoData={dateDownwards}/> */}
        </section>
      </main>
    );
  }
  return <div>channelData</div>;
};

export default Channels;
