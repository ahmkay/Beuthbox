import React, {useState, useLayoutEffect, useEffect, useRef} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Videocam from '@material-ui/icons/Videocam';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('')
    const [leftPosition, setLeftPosition] = useState(null)
    const [indicatorWidth, setIndicatorWidht] = useState(null)
    const [scrollPos, setScrollPos] = useState(0)
    const [showNav, setShowNav] = useState(true)

    let activeRef = useRef(null)
    
    // to move to active indicator
    const moveIndicator = () => {
        // Wait some time to make sure the ref is not null
        // TODO: make async
        setTimeout(function(){
            setLeftPosition(activeRef.current.getBoundingClientRect().left + 'px')
            setIndicatorWidht(activeRef.current.getBoundingClientRect().width + 'px')
        }, 100)
        // if(activeRef.current == null) {
        // }
        //setLeftPosition(activeRef.current.getBoundingClientRect().left + 'px')
        //setIndicatorWidht(activeRef.current.getBoundingClientRect().width + 'px')
    }
    
    // move Indicator every time the window resizes
    useLayoutEffect(() => {
        if (activeRef !== null) {
            window.addEventListener('resize', moveIndicator)
        }
        window.addEventListener('scroll', hideOnScroll)
        return (
            () =>  {
                window.removeEventListener('resize', moveIndicator)
                window.removeEventListener('scroll', hideOnScroll)
            })
    })
    
    const getActiveRoute = (route, location, match) => {
        if (!match) {
            return
          }
        location.pathname === route ? setActiveTab(route) : setActiveTab('')  
        moveIndicator()
    }

    const hideOnScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top)
        setShowNav(document.body.getBoundingClientRect().top > scrollPos)
    }

    return (
        <nav className={`nav ${showNav ? 'show' : ''}`}>
            <div className="main nav__flex-container">
                <input className='nav__searchBar' type='text' name='suche' placeholder='Video, Playlist, Channel, Stichwort...'/>
                <ul className='nav-ul'>
                    <li className='nav__element'
                            ref={activeTab === '/' ? activeRef : null}> 
                        <NavLink 
                            to ='/' 
                            exact 
                            className={`nav-link${activeTab === '/' ? '--isActive' : ''}`} 
                            activeClassName="isActive" 
                            isActive={(match, location) => getActiveRoute('/', location, match)}
                            >
                            <HomeIcon className="nav__icon"/>
                            Home
                        </NavLink>
                    </li>
                    <li className='nav__element' ref={activeTab === '/channel' ? activeRef : null}>
                        <NavLink 
                            to ='/channel' 
                            exact 
                            className={`nav-link${activeTab === '/channel' ? '--isActive' : ''}`} 
                            activeClassName="isActive" 
                            isActive={(match, location) => getActiveRoute('/channel', location, match)}
                            >
                            <LiveTvIcon className="nav__icon"/>
                            Channels
                        </NavLink>
                    </li>
                    <li className='nav__element' ref={activeTab === '/playlist' ? activeRef : null}>
                        <NavLink 
                            to ='/playlist' 
                            exact 
                            className={`nav-link${activeTab === '/playlist' ? '--isActive' : ''}`} 
                            activeClassName="isActive" 
                            isActive={(match, location) => getActiveRoute('/playlist', location, match)}
                            >
                            <PlaylistPlayIcon className="nav__icon"/>
                            Playlists
                        </NavLink>
                    </li>
                    <li className='nav__element'  ref={activeTab === '/live' ? activeRef : null}>
                        <NavLink 
                            to ='/live' 
                            exact 
                            className={`nav-link${activeTab === '/live' ? '--isActive' : ''}`} 
                            activeClassName="isActive" 
                            isActive={(match, location) => getActiveRoute('/live', location, match)}
                            >
                            <FiberManualRecordIcon className="nav__icon nav__icon--live"/>
                            Live
                        </NavLink>
                    </li>
                    <li className='nav__element' ref={activeTab === '/video-services' ? activeRef : null}>
                        <NavLink 
                            to ='/video-services'
                            exact 
                            className={`nav-link${activeTab === '/video-services' ? '--isActive' : ''}`} 
                            activeClassName="isActive" 
                            isActive={(match, location) => getActiveRoute('/video-services', location, match)}
                            >
                            <Videocam className="nav__icon"/>
                            Video&nbsp;Services
                        </NavLink>
                    </li>
                    <span className="nav__indicator" style={{left: leftPosition, width: indicatorWidth}}></span>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar