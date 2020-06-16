import React from "react";
import Illustration from "../../assets/img/Illustration_404.svg";

const NotFound = () => {
  return (
    <main className="main">
      <section className="main__section--center">
        <h1 className="headline--center">Oh!</h1>
        <img
          className="illustration__404"
          src={Illustration}
          alt="Illustration Die Seite wurde nicht gefunden"
        />
        <h3 className="headline--center">
          Diese Seite gibt es noch gar nicht. <br />
          Probiere es mal über die Suche oder einen anderen Punkt aus der
          Navigation
        </h3>
        <h5 className="headline--center">(Ja, das ist eine 404-Seite)</h5>
      </section>
    </main>
  );
};

export default NotFound;
