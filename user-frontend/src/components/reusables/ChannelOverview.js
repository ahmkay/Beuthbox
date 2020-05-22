import React from 'react'
import { BASEURL } from '../../api'
import { NavLink } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const ChannelOverview = ({channelData, channelInfo}) => {
    const renderChannelOverview = (channelData, channelInfo) => {
       return (
       <div className='root-container'>
        <div className='channel-container-header'>
            <h1 className='channel-headline'>Channels</h1>
           {channelInfo &&
            <h2 className='channel-info'>{channelInfo}</h2>}
        </div>
            {channelData.map((channel, index) => {
                return index % 2 === 0 ?
                    <div className='channel-container' >
                        <div className='channel-container-image'>
                        <NavLink to={`/channel/${channel._id}`} className='nav-link'>
                            <img src={`${BASEURL}/channel${channel.imagepath}`} class="channel-image" />
                        </NavLink>
                        </div>
                        <div className='channel-container-content-position-left'>
                            <div className='flex-container'>
                            <NavLink to={`channel/${channel._id}`} className='nav-link'><h2 className='channel-name'>{channel.name}</h2></NavLink>
                            <h4 className='channel-description'>{channel.description}</h4>
                            <div className='channel-container-categories'>
                            <div className='row-element'>
                                <span className='container-research--icon'>
                                    <AddShoppingCartIcon className='research--icon' />
                                </span>
                                <p className='icon--text'>
                                    Forschung
                                </p>
                    
                            </div>

                            <div className='row-element'>
                                <span className='container-campus--icon'>
                                    <SchoolIcon className='campus--icon' />
                                </span>
                                <p className='icon--text'>
                                    Campus
                                </p>
                    
                            </div>

                            <div className='row-element'>
                                <span className='container-students--icon'>
                                    <ColorLensIcon className='students--icon' />
                                </span>
                                <p className='icon--text'>
                                    Studiprojekte
                                </p>
                    
                            </div>
                            
                        </div>
                            </div>
                        </div>
                    </div>
                    : 
                    <div className='channel-container' >
                    <div className='channel-container-content-position-right'>
                        <div className='flex-container'>
                        <NavLink to={`channel/${channel._id}`} className='nav-link'><h2 className='channel-name'>{channel.name}</h2></NavLink>
                        <h4 className='channel-description'>{channel.description}</h4>
                        <div className='channel-container-categories'>
                            <div className='row-element'>
                                <span className='container-research--icon'>
                                    <AddShoppingCartIcon className='research--icon' />
                                </span>
                                <p className='icon--text'>
                                    Forschung
                                </p>
                    
                            </div>

                            <div className='row-element'>
                                <span className='container-campus--icon'>
                                    <SchoolIcon className='campus--icon' />
                                </span>
                                <p className='icon--text'>
                                    Campus
                                </p>
                    
                            </div>

                            <div className='row-element'>
                                <span className='container-students--icon'>
                                    <ColorLensIcon className='students--icon' />
                                </span>
                                <p className='icon--text'>
                                    Studiprojekte
                                </p>
                    
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    <div className='channel-container-image'>
                    <NavLink to={`/channel/${channel._id}`} className='nav-link'>
                        <img src={`${BASEURL}/channel${channel.imagepath}`} class="channel-image" />
                    </NavLink>
                    </div>
                </div>
        })}
        </div>
        )
    }

    return (
        <>
        {renderChannelOverview(channelData, channelInfo)}
        </>
    )
}

export default ChannelOverview

