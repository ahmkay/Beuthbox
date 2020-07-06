import React, { useContext } from "react";
import VideoRow from "../../components/reusables/VideoRow";

import Illustration from "../../assets/img/Illustration_Sendepause.svg";
import { DataContext } from "../../api/DataContext";

const LiveOffline = () => {
  const { recommendedVideos } = useContext(DataContext)
  return (
    <>
      <main className="main">
        <section className="main__section--center">
          <h1 className="no-livestream__headline--center">Sendepause</h1>
          <img
            src={Illustration}
            alt="Illustration - Livestream nicht verfügbar"
            className="illustration__no-livestream"
          />
          <h4 className="no-livestream__headline--center">
            Momentan ist kein Livestream geplant. <br />
            Wir haben weiter unten ein paar Aufzeichnungen und weitere Videos
            für Dich zusammengestellt.
          </h4>
        </section>
      </main>
      <div className="container-80">
        <VideoRow
          headline="Vergangene Livestreams"
          flexDirection="row"
          amountOfVideos={3}
          videos={recommendedVideos}
        />
        <VideoRow
          headline="Vorgeschlagene Videos"
          flexDirection="row"
          amountOfVideos={3}
          videos={recommendedVideos}
        />
      </div>
    </>
  );
};

export default LiveOffline;
