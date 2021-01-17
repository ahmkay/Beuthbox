import React, { useContext } from "react";
import { DataContext } from "../../api/DataContext";
import ServiceCard from "./ServiceCard";
import MultiCarousel from "../../components/reusables/MutliCarousel";
//data
import Services from "./Services.json";
import Equipment from "./Equipment.json";
//imgs
import Illustration from "../../assets/img/Illustration_Cameraman.svg";
import HeaderProductionStdio from "../../assets/img/video-services/header_production-studio.svg";
import HeaderContentProduction from "../../assets/img/video-services/header_content-production.svg";
import HeaderEquipment from "../../assets/img/video-services/header_equipment.svg";
import HeaderContact from "../../assets/img/video-services/header_contact.svg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Phone from "@material-ui/icons/Phone";
import Mail from "@material-ui/icons/Mail";
import EquipmentAccordion from "./EquipmentAccordion";

const VideoServices = () => {
  const { newestVideos } = useContext(DataContext);

  const renderServiceCards = () => {
    // TODO: check for null

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

      <section className="main__section main__section--vs-center">
        <header className="section-header-vs section-header-vs--left">
          <h2 className="section-header__headline">
            Wo finden Sie das Lehrfilmproduktionsstudio?
          </h2>
          <img
            src={HeaderProductionStdio}
            alt="Lehrfilmproduktionsstudio header-img"
            className="section-header__img"
          />
        </header>
      </section>

      <section className="main__section main__section--vs-center service-content-production">
        <header className="section-header-vs section-header-vs--right">
          <h2 className="section-header__headline">
            Welche Beiträge können wir mit Ihnen produzieren?
          </h2>
          <img
            src={HeaderContentProduction}
            alt="Beiträge produzieren header-img"
            className="section-header__img"
          />
        </header>
        <article>
          <h3 className="service-content-production__subline">
            Mögliche Formate der Videoproduktion sind z.B.
          </h3>
          <ul className="service-content-production__list">
            <li>Kurz-Lehrfilm</li>
            <li>Vertiefungsfilm</li>
            <li>Vorlesung</li>
            <li>Vortrag</li>
            <li>Interview</li>
            <li>Präsentation von Forschungsprojekten</li>
            <li>Präsentation von Studierenden-Projekten</li>
            <li>Vorstellung der Labore</li>
            <li>... Und vieles mehr!</li>
          </ul>
        </article>
      </section>

      <section className="main__section">
        <h3>
          Film ab! Sehen Sie sich hier einige Beispiele aus unseren Produktionen
          an:
        </h3>
        <MultiCarousel elements={newestVideos} type="video" />
      </section>

      <section className="main__section main__section--vs-center">
        <header className="section-header-vs section-header-vs--left">
          <div className="section-header__headline">
            <h2>
              Welches Video-Equipment bieten wir zur Ausleihe an und wie können
              sie es reservieren?
            </h2>
            <h5 className="section-header__subline">
              Für alle möglichen Projekte können ist die Ausleihe der
              unterschiedlichsten Geräte möglich. Sehen Sie hier eine Auswahl
              des zur Verfügung stehenden Equipments und Erfahren Sie mehr über
              den Vorgang beim Ausleihen.
            </h5>
          </div>
          <img
            src={HeaderEquipment}
            alt="Beiträge produzieren header-img"
            className="section-header__img"
          />
        </header>
        <h3 className="service-equipment__subline">
          Zur Verfügung stehendes Equipment
        </h3>
        <EquipmentAccordion />
      </section>

      <section className="main__section main__section--vs-center vs-contact">
        <header className="section-header-vs section-header-vs--right">
          <h2 className="section-header__headline">
            Wie Sie uns erreichen und Termine vereinbaren können
          </h2>
          <img
            src={HeaderContact}
            alt="Kontakt header-img"
            className="section-header__img"
          />
        </header>
        <div className="vs-contact__data">
          <div className="data__reachability">
            <h4 className="reachability__headline">
              Erreichbarkeit an folgenden Tagen:
            </h4>
            <table className="reachability__time-table">
              <tbody>
                <tr>
                  <td>
                    <h5>Mo:</h5>
                  </td>
                  <td>
                    <h5>10:00 - 13:00 Uhr</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Di:</h5>
                  </td>
                  <td>
                    <h5>10:00 - 13:00 Uhr</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Mi:</h5>
                  </td>
                  <td>
                    <h5>--</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Do:</h5>
                  </td>
                  <td>
                    <h5>14:00 - 18:30 Uhr</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Fr:</h5>
                  </td>
                  <td>
                    <h5>10:00 - 12:00 Uhr</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="data__contactinfo">
            <ul className="contactinfo__list">
              <li className="contactinfo__listing">
                <AccountCircle className="contactinfo__icon" />
                <h5>Prof. Dr. Robert Strzebkowski</h5>
              </li>
              <li className="contactinfo__listing">
                <Phone className="contactinfo__icon" />
                <a href="tel:+49 (0)30 123 45 67 89">
                  <h5>+49 (0)30 123 45 67 89</h5>
                </a>
              </li>
              <li className="contactinfo__listing">
                <Mail className="contactinfo__icon" />
                <a href="mailto:">
                  <h5>mail@adresse.de</h5>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VideoServices;
