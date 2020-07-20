import React from "react";
import img1 from "../../assets/img/ueber_uns/beuthbox1.png";
import img2 from "../../assets/img/ueber_uns/beuthbox2.png";
import img3 from "../../assets/img/ueber_uns/beuthbox3.png";
import img4 from "../../assets/img/ueber_uns/beuthbox4.png";
import img5 from "../../assets/img/ueber_uns/beuthbox5.png";
import img6 from "../../assets/img/ueber_uns/beuthbox6.png";
import img7 from "../../assets/img/ueber_uns/beuthbox7.jpg";
import IllustrationDevelopment from "../../assets/img/Illustration_Development-Process.svg";
import IllustrationTeam from "../../assets/img/Illustration_Team.svg";

const AboutUs = () => {
  return (
    <main className="main ueber-uns">
      <header>
        <h1 className="page-headline">Über uns</h1>
        <h3>...Denn ein Video ist mehr als 1000 Bilder</h3>
      </header>
      <section className="main__section">
        <p>
          Die beuthBOX ist die offizielle WebTV-Plattform der Beuth Hochschule
          für Technik Berlin, um bedeutende Hochschulveranstaltungen und
          Hochschulereignisse, Symposien und Tagungen sowie spannende
          Forschungs- und Studierendenprojekte im Videoformat oft auch als
          Livestream darzustellen. Die beuthBOX bietet darüber hinaus allen
          Lehrkräften die Möglichkeit kurze Lehrfilme zu produzieren.
        </p>
        <p>
          Die zentrale Aufgabe der beuthBOX ist, die vielfältigen spannenden
          Aktivitäten an der Beuth Hochschule per Bewegtbild (Video) nach außen
          aber auch nach Innen darzustellen, zu kommunizieren.
        </p>
      </section>
      <section>
        <div className="ueber-uns__team-card--center paper--elevation-1">
          <h5>Projektleitung</h5>
          <p>
            Prof. Dr. Robert Strzebkowski
            <br />
            FBVI Informatik und Medien <br />
            Laborleiter Film und Fernsehen
          </p>
          <h5>
            Kontakt:{" "}
            <a href="mailto:robert.strzebkowski@beuth-hochschule.de">
              robert.strzebkowski@beuth-hochschule.de
            </a>
          </h5>
        </div>
        <div className="ueber-uns__team">
          <img
            src={IllustrationDevelopment}
            alt="Development Team"
            className="ueber-uns__team-img"
          />
          <div>
            <div className="ueber-uns__team-card paper--elevation-1">
              <h4>Das akutelle beuthBOX-Team</h4>
              <p>
                Wolfgang Antoniazzi
                <br />
                Markus Kehrer
                <br />
                Dorothea Pilz
              </p>
            </div>
            <div className="ueber-uns__team-card paper--elevation-1">
              <h5>
                Bisherige Mitwirkende mit erheblichen Anteilen an der
                Entwicklung, Design und Konzeption der beuthBOX
              </h5>
              <p>
                Marlon Mattern
                <br />
                Leon Rösler
                <br />
                Clemens Buckert
                <br />
                Heiko Mevius
                <br />
                Dennis Oczko
                <br />
                Sebastian Riedel
                <br />
                Nicole Schneidereit
                <br />
                Sergej Schulz
                <br />
                Sven Spielvogel
                <br />
                Stefan Streichan
                <br />
                Andreas Tomm
              </p>
            </div>
          </div>
        </div>
        <div className="ueber-uns__team--reverse">
          <img
            src={IllustrationTeam}
            alt="Development Team"
            className="ueber-uns__team-img"
          />
          <div>
            <div className="ueber-uns__team-card paper--elevation-1">
              <h5>
                Bisherige weitere Mitwirkende an der Entwicklung, Design und
                Konzeption der beuthBOX
              </h5>
              <p>
                Süreyya Aksoy
                <br />
                Ahmed Al-Jabiri
                <br />
                Madlin Ankert
                <br />
                Jan Berdi
                <br />
                Ilona Demidenko
                <br />
                Michael Duve
                <br />
                Sebastian Friedersen
                <br />
                Denis Hartmann
                <br />
                Sarah Yvonne Häuser
                <br />
                Melina Hortz
                <br />
                Christopher Kraus
                <br />
                Fortunata Lehmann
                <br />
                Felix Maulwurf
                <br />
                Björn Münchau
                <br />
                Burak Özhan
                <br />
                Kai Schirmer
                <br />
                Stephan Völkel
              </p>
            </div>
            <div className="ueber-uns__team-card paper--elevation-1">
              <h5>Beteiligte Kolleginnen und Kollegen und deren Studierende</h5>
              <p>
                Prof. Antya Umstätter
                <br />
                Prof. Dr. Jürgen Lohr
                <br />
                Stefanie Jotzo
                <br />
                Ilka Berghof
                <br />
                Ute Härting
              </p>
            </div>
          </div>
        </div>
      </section>
      <h2>Die Chronik der Entwicklung</h2>
      <section className="main__section">
        <h4>Neugestaltung- und Programmierung des Front-Ends (seit 2020)</h4>
        <p>
          Im Laufe der Zeit hatten viele kleinere und größere Anpassungen das
          Aussehen der beuthBOX verändert. Durch die Konzentration auf neue
          Features, dem Ausbau des Backends und CMS und dem Fehlen eines
          grundlegenden Designleitfadens hatte sich das User Interface mit der
          Zeit aus vielen unterschiedlichen Teilen zusammengesetzt.
          <br />
          Im Zuge der technischen und gestalterischen Evolution, sowie der neuen
          Ausrichtung und des gestärkten Stellenwerts der beuthBOX innerhalb der
          Hochschule, wurde im Rahmen einer Masterarbeit im SoSe2020 eine
          komplette Überarbeitung des Front-Ends vorgenommen.
        </p>
        <p>
          Das Design wurde dabei von Grund auf neu gestaltet und kann sich jetzt
          mit den neusten Trends und Standards in der UI-Gestaltung sehen
          lassen.
          <br />
          Als wichtiges Gestaltungselement ist die "BOX" an vielen Stellen als
          Wiedererkennungswert zu finden. Moderne Illustrationen sorgen für
          Leichtigkeit und helfen in Kombination mit Text zum einfacheren
          Verständnis von Inhalten. Der gezielte Einsatz von Animationen,
          Transitions und Hover-Effekten unterstützt die UX und lässt
          zusätzliche Informationen zur richtigen Zeit erscheinen. Ein Darkmode
          wird automatisch nach der auf dem Endgerät festgelegten Einstellung
          übernommen und kann zu jeder Zeit nachträglich angepasst werden.
          <br />
          Ein besonderes Augenmerk bei der Gestaltung wurde auch auf einen
          konsistenten Aufbau und eine Erkennung zur Zugehörigkeit zur Beuth
          Hochschule Berlin gelegt.
        </p>
        <p>
          Auf der technischen Seite setzt das Front-End ab jetzt auf die
          React-Bibliothek.
          <br />
          Diese Bibliothek ist sehr modern und bietet eine hervorragende
          Performance. Durch die Programmierung in kleinen Komponenten lässt
          sich der Code nun besser und effizienter warten.
        </p>
      </section>
      <section className="main__section">
        <h4>Einsatz des Paella Players (seit 2018)</h4>
        <p>
          Die beuthBOX Videoplattform entwickelt sich stets weiter und
          präsentiert sich heutzutage in ihrer vierten Version. Das
          beuthBOX-Team sowie Studierende arbeiten kontinuierlich an
          Verbesserungen und Innovationen sowohl im Front-End als auch im
          Back-End Bereich der beuthBOX als auch an neuen Produktionsverfahren.
        </p>
        <p>
          Zum Beispiel wurde exemplarisch die Dual-View Technik diesmal auf
          HTML5/Javascript Basis und basierend auf dem sog. 'Paella-Player' der
          Universität Valencia (Spanien) in die beuthBOX-Plattform eingebaut und
          auch optisch entsprechend angepasst:
        </p>
        <img src={img7} alt="Paella Player" className="ueber-uns__title-img" />
      </section>
      <section className="main__section">
        <h4>Umstellung auf HTML5 (seit 2016)</h4>
        <p>
          Die Umstellung der beuthBOX im Laufe der nächsten Jahre auf
          HTML5/Javascript basiertes System hat uns hinsichtlich der Dual-View
          Technik um einige Jahre zurück 'geworfen'…
        </p>
        <p>
          Dafür aber wurde die beuthBOX hinsichtlich des User-Interfaces an das
          'Corporate Design' der Beuth Hochschule sowie an modernes
          Webseiten-Design angepaßt mit der sog. 'responsiven' User Interface
          Technik, damit die Webseite auf allen gängigen Nutzungsgeräten, wie
          PC's, Laptops, Tablets und Smartphones vernünftig darstellbar ist:
        </p>
        <img src={img4} alt="Responsive UI" className="ueber-uns__title-img" />
        <p>
          Mit der neuen modernen Benutzerschnittstelle waren wir als
          beuthBOX-Team und die Hochschule sehr zufrieden, ABER… es gab stets
          kleine Funktionsprobleme im Back-End Bereich der beuthBOX, so dass
          Mitte 2016 die wichtige Entscheidung fiel, die WebTV-Plattform auf ein
          durch größere Programmier-Community gepflegtes und verbreitetes System
          umzustellen. Die studentischen und wissenschaftlich-technischen
          Mitarbeiter*innen verlaßen naturgemäß nach einiger Zeit die Hochschule
          und nehmen auch das Entwickler Know-How mit… Zeit für die Erstellung
          einer ausführlichen guten Dokumentation ist stets viel zu wenig, das
          war auch ein Grund für den Wechsel…
        </p>
        <p>
          Seit Ende 2016 haben wir die beuthBOX-Plattform auf das Open Source
          Online-Video System 'Opencast' umgestellt:
        </p>
        <img
          src={img5}
          alt="Umstellung auf Opencast"
          className="ueber-uns__title-img"
        />
        <p>
          Opencast kommt aus der akademischen / universitären Umgebung und wird
          kontinuierlich durch eine zunehmende Entwickler*innen Community im
          Hinblick auf die Bedürfnisse des Videoeinsatzes an den Hochschulen
          weiterentwickelt.
        </p>
        <p>
          Wegen bestimmter Einschränkungen des original Video-CMS von Opencast
          mussten wir .- wie viele andere Universitäten weltweit - doch wieder
          ein eigenes 'kleines' Video-CMS entwickeln, was zum großen Teil im
          Rahmen einer Masterarbeit im WS 2017/2018 geschah:
        </p>
        <img src={img6} alt="Neues CMS" className="ueber-uns__title-img" />
      </section>
      <section className="main__section">
        <h4>Version 1 (2011 - 2016)</h4>
        <p>
          Die beuthBOX ging in der allerersten Version an Start bereits im Jahr
          2011 und mit großem Enthusiasmus der damaligen Gestalter*innen und
          Entwickler*innen, denn bis Mitte 2016 war die beuthBOX eine zu 100%
          eigene Softwareentwicklung im Front-End wie im Back-End mit einem
          eigenen Video-CMS!
        </p>
        <img src={img1} alt="version 1" className="ueber-uns__title-img" />
        <p>
          Die WebTV-Plattform 'beuthBOX' wurde seit 2011 und wird weiterhin im
          Rahmen von Semester- und Abschlussprojekten sowie von zwei Forschungs-
          und Entwicklungsprojekten im FB VI Informatik und Medien, Studiengang
          Medieninformatik sowie Druck- und Medientechnik unter der Leitung von
          Prof. Dr. Robert Strzebkowski entwickelt und betrieben.
        </p>
        <p>
          Die Namen der seit 2011 an der Entwicklung der beuthBOX mitwirkenden
          Studierenden, Mitarbeiter*innen sowie auch Kolleg*innen sind oben auf
          dieser Seite aufgelistet.
        </p>
        <p>
          Bereits Im Jahr 2011 waren wir stolz, dass wir zu den ersten Anbietern
          überhaupt der sog. 'Dual-View' Technik gehörten, mit der Livestreams
          sowie Aufzeichnungen von wichtigen Events, Symposien, Konferenzen mit
          zwei exakt synchronisierten Videobildern - 1x der Präsentationsperson
          und 1x der (PPT) Präsentation - jedoch flexibel in der Darstellung
          dieser Videostreams zueinander darstellbar waren. Die Zuschauer*innen
          konnten selbst wählen, welchen Videostream diese in welcher Größe und
          ob überhaupt sehen möchten:
        </p>
        <img
          src={img2}
          alt="Dualview Screenshot 1"
          className="ueber-uns__title-img"
        />
        <img
          src={img3}
          alt="Dualview Screenshot 2"
          className="ueber-uns__title-img"
        />
        <p>
          Das war die sog. 'Flash'-Ära der beuthBOX, bei der der Videoplayer auf
          Basis der Adobe Flash Technologie umgesetzt war, die seiner Zeit weit
          voraus war…
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
