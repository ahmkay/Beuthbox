import React, { useContext } from "react";
import VideoRow from "../../components/reusables/VideoRow";
import Illustration from "../../assets/img/Illustration_Suche.svg";
import { DataContext } from "../../api/DataContext";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";

const LiveOffline = () => {
  const { recommendedVideos } = useContext(DataContext);
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
      <h3 className="video-row__title">Vergangene Livestreams</h3>
      <ThumbnailGrid elements={recommendedVideos.slice(0,4)} columnNumber={4} type='video' />
      <h3 className="video-row__title">Vorgeschlagene Videos</h3>
      <ThumbnailGrid elements={recommendedVideos.slice(0,4)} columnNumber={4} type='video' />
      </div>
    </>
  );
};

export default LiveOffline;
