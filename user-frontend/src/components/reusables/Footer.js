import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../../assets/img/icons/facebook-logo.svg'

const Footer = () => {
    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <Link to="/aboutus"><h5> Über uns</h5></Link>
                    </li>
                    <li>
                        <a href="https://www.beuth-hochschule.de/impressum/" target="_blank"><h5>Impressum</h5></a>
                    </li>
                    <li>
                        <Link to="/privacy"><h5>Datenschutz</h5></Link>
                    </li>
                </ul>
            </nav>
            <a href="https://www.facebook.com/beuthmedialabs/" target="_blank"><img src={facebook} alt="Facebook"/></a>
            <small>&copy; BeuthBOX 2020</small>
        </footer>
    )
}

export default Footer