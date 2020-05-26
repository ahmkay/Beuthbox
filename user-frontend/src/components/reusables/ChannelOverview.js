import React from 'react'
import { BASEURL } from '../../api'
import { NavLink } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {ReactComponent as MagicIcon} from '../../assets/img/icons/magic.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


const ChannelOverview = ({channelData, channelInfo}) => {
    const renderChannelOverview = (channelData, channelInfo) => {
       return (
       <section className='channels-section'>
        <header className='channels-section__header'>
            <h1 className='channel-header__headline'>Channels</h1>
           {channelInfo &&
            <h2 className='channel-header__info'>{channelInfo}</h2>}
        </header>
            {channelData.map((channel, index) => {
                return (
                    <NavLink to={`/channel/${channel._id}`} className={`channel-container ${index % 2 === 0 ? 'channel-container--left' : 'channel-container--right'}`}>
                        
                        <div className="channel-thumbnail-box">
                            <div className="channel-thumbnail-box__content">
                                <img src={`${BASEURL}/channel${channel.imagepath}`} class="channel-thumbnail-box__image" />
                            </div>
                        </div>
                        <div className={`channel-info-box ${index % 2 === 0 ? 'channel-info-box--left' : 'channel-info-box--right'}`}>
                            <h2 className='channel-info-box__channel-name'>{channel.name}</h2>
                            <h4 className='channel-description'>{channel.description}</h4>
                            <div className='channel-container-categories'>
                                <div className='row-element'>
                                    <span className='container__icon container__icon--research'>
                                        <SvgIcon component={MagicIcon} className='container-icon__category-icon container-icon__category-icon--research' />
                                    </span>
                                    <p className='icon--text'>
                                        Forschung
                                    </p>
                                    </div>
                                <div className='row-element'>
                                    <span className='container__icon container__icon--campus'>
                                        <SchoolIcon className='container-icon__category-icon container-icon__category-icon--campus' />
                                    </span>
                                    <p className='icon--text'>
                                        Campus
                                    </p>
                                </div>
                                <div className='row-element'>
                                    <span className='container__icon container__icon--student'>
                                        <ColorLensIcon className='container-icon__category-icon container-icon__category-icon--students' />
                                    </span>
                                    <p className='icon--text'>
                                        Studiprojekte
                                    </p>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </section>
        )
    }

    return (
        <>
        {renderChannelOverview(channelData, channelInfo)}
        </>
    )
}

export default ChannelOverview