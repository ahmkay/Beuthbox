import React from "react";
import Illustration from "../../assets/img/Illustration_Cameraman.svg";

const VideoServices = () => {
  return (
    <main className="main">
      <header className="vs-header">
        <h1 className="page-headline">Video Services</h1>
        <div className="vs-header__subline">
          <img
            src={Illustration}
            alt="video services illustration"
            className="vs-header__illustration"
          />
          <h3 className="vs-header__description">
            Wir stellen vor: Video-Services
            <br />
            Ein Service, der allen Mitarbeitern und Studierenden der Beuth
            Hochschule zur Verfügung steht. Ihr wollt einen Film aufnehmen, euch
            weiterbilden oder euren Vortrag Live streamen? Wir unterstützen euch
            dabei!
          </h3>
        </div>
      </header>
      <section className="main__section main__section--vs">
        <h2>Welche Services bietet das beuthBOX Team?</h2>
      </section>
    </main>
  );
};

export default VideoServices;
