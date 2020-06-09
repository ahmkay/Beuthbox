import React, {useState} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Videocam from '@material-ui/icons/Videocam';
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
            <div className="main nav__flex-container">
                <input className='nav__searchBar' type='text' name='suche' placeholder='Video, Playlist, Channel, Stichwort...'/>
                <ul className='nav-ul'>
                    <li className='nav__element'> 
                        <NavLink to ='/' exact className={`nav-link${activeTab === '/' ? '--isActive' : ''}`} activeClassName="isActive" isActive={(match, location) => getActiveRoute('/', location, match)}>
                            <HomeIcon className="nav__icon"/>
                            Home
                        </NavLink>
                        {activeTab === '/' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav__element'> 
                        <NavLink to ='/channel' exact className={`nav-link${activeTab === '/channel' ? '--isActive' : ''}`} activeClassName="isActive" isActive={(match, location) => getActiveRoute('/channel', location, match)}>
                            <LiveTvIcon className="nav__icon"/>
                            Channels
                        </NavLink>
                        {activeTab === '/channel' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav__element'> 
                        <NavLink to ='/playlist' exact className={`nav-link${activeTab === '/playlist' ? '--isActive' : ''}`} activeClassName="isActive" isActive={(match, location) => getActiveRoute('/playlist', location, match)}>
                            <PlaylistPlayIcon className="nav__icon"/>
                            Playlists
                        </NavLink>
                        {activeTab === '/playlist' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav__element'> 
                        <NavLink to ='/live' exact className={`nav-link${activeTab === '/live' ? '--isActive' : ''}`} activeClassName="isActive" isActive={(match, location) => getActiveRoute('/live', location, match)}>
                            <FiberManualRecordIcon className="nav__icon nav__icon--live"/>
                            Live
                        </NavLink>
                        {activeTab === '/live' && <div className='tabIndicator'/>}
                    </li>
                    <li className='nav__element'> 
                        <NavLink to ='/video-services' exact className={`nav-link${activeTab === '/video-services' ? '--isActive' : ''}`} activeClassName="isActive" isActive={(match, location) => getActiveRoute('/video-services', location, match)}>
                            <Videocam className="nav__icon"/>
                            Video&nbsp;Services
                        </NavLink>
                        {activeTab === '/video-services' && <div className='tabIndicator'/>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar