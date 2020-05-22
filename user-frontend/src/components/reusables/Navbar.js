import React, {useState} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('')
    
    const getActiveRoute = (route, location, match) => {
        if (!match) {
            return false;
          }
        location.pathname === route ? setActiveTab(route) : setActiveTab('')  
    }

    return (
        <nav className="nav">
            <div className='nav-inner-container'>
                <div className='input-container'>
                <input className='searchBar' type='text' name='suche' placeholder='Video, Playlist, Channel...'/>
                </div>
                <div className='icon-container'>
                <ul className='nav-ul'>
                    <li className='nav-li'> 
                        <NavLink to ='/' exact className={`nav-link ${activeTab === '/' ? 'selected' : ''}`} isActive={(match, location) => getActiveRoute('/', location, match)}>
                            <span className='icon-wrapper'>
                            <HomeIcon/>
                            </span>
                            Home
                            </NavLink>
                        {activeTab === '/' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav-li'> 
                        <NavLink to ='/channel' exact className={`nav-link ${activeTab === '/channel' ? 'selected' : ''}`} activeClassName="selected" isActive={(match, location) => getActiveRoute('/channel', location, match)}>
                            <span className='icon-wrapper'>
                            <LiveTvIcon/>
                            </span>
                            Channels
                            </NavLink>
                        {activeTab === '/channel' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav-li'> 
                        <NavLink to ='/playlist' exact className={`nav-link ${activeTab === '/playlist' ? 'selected' : ''}`} activeClassName="selected" isActive={(match, location) => getActiveRoute('/playlist', location, match)}>
                            <span className='icon-wrapper'>
                            <PlaylistPlayIcon/>
                            </span>
                            Playlists
                            </NavLink>
                        {activeTab === '/playlist' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav-li'> 
                        <NavLink to ='/live' exact className={`nav-link ${activeTab === '/live' ? 'selected' : ''}`} activeClassName="selected" isActive={(match, location) => getActiveRoute('/live', location, match)}>
                            <span className='icon-wrapper'>
                            <FiberManualRecordIcon className='live--icon'/>
                            </span>
                            Live
                            </NavLink>
                        {activeTab === '/live' && <div className='tabIndicator'/>}
                    </li>
                </ul>
                </div>
                
            
            </div>
        </nav>
    )
}

export default Navbar