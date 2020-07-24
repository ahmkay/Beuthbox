import React from "react";
import { Link } from "react-router-dom";
import facebook from "../../assets/img/icons/facebook-logo.svg";
import ThemeSwitcher from "../reusables/ThemeSwitcher";
import BeuthLogo from "../../assets/img/Beuth_Logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul className="footer__nav-list">
          <li className="footer__nav-element">
            <Link to="/aboutus" className="footer__nav-link">
              Über uns
            </Link>
          </li>
          <li className="footer__nav-element">
            <a
              href="https://www.beuth-hochschule.de/impressum/"
              target="_blank"
              className="footer__nav-link"
            >
              Impressum
            </a>
          </li>
          <li className="footer__nav-element">
            <Link to="/privacy" className="footer__nav-link">
              Datenschutz
            </Link>
          </li>
          <li className="footer__nav-element">
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
      <div>
        <a hre="https://www.beuth-hochschule.de/" className="nav__link">
          <img
            src={BeuthLogo}
            alt="Beuth Hochschule Berlin Logo"
            className="nav-link--icon"
          />
        </a>
        <a
          href="https://www.facebook.com/beuthmedialabs/"
          target="_blank"
          className="nav__link"
        >
          <img src={facebook} alt="Facebook" className="nav-link--icon" />
        </a>
      </div>
      <small>&copy; BeuthBOX 2020</small>
    </footer>
  );
};

export default Footer;
