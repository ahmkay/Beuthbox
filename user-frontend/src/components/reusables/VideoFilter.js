import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SvgIcon from '@material-ui/core/SvgIcon';
import {ReactComponent as MagicIcon} from '../../assets/img/icons/magic.svg';
import {ReactComponent as IconBook} from '../../assets/img/icons/Icon_Book.svg';


const VideoFilter = () => {
    return (
        <div className='filter-panel'>
                <div className='filter-panel__filter filter-panel__filter--short'>
                    <h4 className='filter-panel__title'>Anzeigen</h4>
                    <select name="video-type" id="video-type" className='filter-panel-select'>
                        <option value="all">Alle</option>
                        <option value="videos">Videos</option>
                        <option value="playlists">Playlisten</option>
                        <option value="channel">Channels</option>
                    </select>
                </div>
                <div className='filter-panel__filter filter-panel__filter--short'>
                    <h4 className='filter-panel__title'>Sortieren</h4>
                    <select name="video-type" id="video-type" className='filter-panel-select'   >
                        <option value="date-upwards">Veröffentlichungsdatum &#11206;</option>
                        <option value="date-downwards">Veröffentlichungsdatum &#9650;</option>
                        <option value="duration-upwards">Länge </option>
                        <option value="duration-downwards">Länge &#9650;</option>
                    </select>
                </div>
                
                <div className='filter-panel__filter filter-panel__filter--long'>
                    <h4 className='filter-panel__title'>Kategorien</h4>
                    <div className='filter-panel__controller'>
                    <div className='filter-panel__category-option'>
                        <ColorLensIcon /> <span>Studiprojekte</span>
                    </div>
                    <div  className='filter-panel__category-option'>
                    <SvgIcon component={IconBook} /> <span>Vorlesung</span>
                    </div>
                    <div  className='filter-panel__category-option'>
                        <SchoolIcon /> <span>Campus</span>
                    </div>
                    <div  className='filter-panel__category-option'>
                    <SvgIcon component={MagicIcon} /> <span>Froschung</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoFilter