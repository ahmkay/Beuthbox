import React, {useState, useContext} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
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
                <input type='text' name='suche' placeholder='Video, Playlist, Channel...'/>
                </div>
                <div className='icon-container'>
                <ul>
                    <li> 
                        <NavLink to ='/' exact className={activeTab === '/' ? 'selected' : ''} isActive={(match, location) => getActiveRoute('/', location, match)}>
                            <span className='iconWrapper'>
                            <HomeIcon/>
                            </span>
                            Home
                            </NavLink>
                        {activeTab === '/' && <div className='tabIndicator'/>}
                    </li>
                    <li> 
                        <NavLink to ='/channel' exact className={activeTab === '/channel' ? 'selected' : ''} activeClassName="selected" isActive={(match, location) => getActiveRoute('/channel', location, match)}>
                            <span className='iconWrapper'>
                            <LiveTvIcon/>
                            </span>
                            Channels
                            </NavLink>
                        {activeTab === '/channel' && <div className='tabIndicator'/>}
                    </li>
                    <li> 
                        <NavLink to ='/playlist' exact className={activeTab === '/playlist' ? 'selected' : ''} activeClassName="selected" isActive={(match, location) => getActiveRoute('/playlist', location, match)}>
                            <span className='iconWrapper'>
                            <PlaylistPlayIcon/>
                            </span>
                            Playlists
                            </NavLink>
                        {activeTab === '/playlist' && <div className='tabIndicator'/>}
                    </li>
                    <li> 
                        <NavLink to ='/live' exact className={activeTab === '/live' ? 'selected' : ''} activeClassName="selected" isActive={(match, location) => getActiveRoute('/live', location, match)}>
                            <span className='iconWrapper'>
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