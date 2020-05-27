import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * A reusable Button component to show a button and hanle click-events
 * 
 * @param {onClick, icon, iconAlt, text} props 
 * 
 *  Use the icon prop to optionally display an icon next to the text.
 *  Import the svg as an react compontent like so: import {ReactComponent as iconName} from '../../assets/img/IconName.svg'
 *  Important: The icon have to be a svf-file and 24x24px in size!
 *  Don't forget to pass an alt-text if you want to use an icon within the button.
 * 
 * Example:
 * import {ReactComponent as facebook} from '../../assets/img/facebook-logo.svg'
 * <Button text="Click me!" onClick={() => {console.log('Button clicked)}} icon={facebook} alt="Facebbok" />
 */

const SecondaryButton = (props) => {

    return (
        <button onClick={props.onClick} className={`button-secondary ${props.additionalClasses ? props.additionalClasses : ''}`}>{props.icon? <SvgIcon component={props.icon} className="button-secondary__icon" alt={props.iconAlt} /> : null}{props.text ? props.text : "Button"}</button>
    )
}

export default SecondaryButton