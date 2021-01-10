import React from "react";
import Illustration from "../../assets/img/Illustration_Cameraman.svg";
import ServiceCard from "./ServiceCard";
import Services from "./Services.json";

const VideoServices = () => {
  const renderServiceCards = () => {
    return Services.map((service) => {
      return (
        <ServiceCard
          imgName={service.img}
          title={service.title}
          description="Durchführung von Lehrfilmaufnahmen im neuen Lehrfilmstudio im Haus Bauwesen, Raum D-103"
        />
      );
    });
  };

  return (
    <main className="main">
      <header className="vs-header">
        <h1 className="page-headline">Video Services</h1>
        <section className="vs-header__subline">
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
        </section>
      </header>
      <section className="main__section main__section--vs">
        <h2 className="main__section__headline">
          Welche Services bietet das beuthBOX Team?
        </h2>
        <div className="video-services__grid">{renderServiceCards()}</div>
      </section>
    </main>
  );
};

export default VideoServices;
