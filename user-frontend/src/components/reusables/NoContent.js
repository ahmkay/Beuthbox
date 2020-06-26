import React from 'react'
import PlaceholderVideo from '../../assets/img/Placeholder_Video.svg'
import PlaceholderPlaylist from '../../assets/img/Placeholder_Playlist.svg'
import PlaceholderChannel from '../../assets/img/Placeholder_Channel.svg'

/**
 * A reusable component to display a placeholder when the needed content wasn't found
 * 
 * @param {String} content the content that should be displayed. Possible options: 'video', 'playlist', 'channel'
 * 
 * @example
 * <NoContent content='video' />
 */

const NoContent = ({content}) => {

    let img
    let text = ''

    switch (content) {
        case 'video':
            img = PlaceholderVideo
            text = 'Videos'
            break
        case 'playlist':
            img = PlaceholderPlaylist
            text = 'Playlists'
            break
        case 'channel':
            text = 'Channels'
            img = PlaceholderChannel
            break
        default:
            break
    }

    return (
        <div className={`no-content${content === 'channel' ? '--channel' : ''}`}>
            <img className="no-content__img" src={img} />
            <h5 className="no-content__text">Keine {text} gefunden :(</h5>
        </div>
    )
}

export default NoContent