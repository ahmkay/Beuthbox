import React from 'react'

const PlaylistHeader = (props) => {
    return (
        <header className="playlist-header">
            <img className="playlist-header__title-img" src={props.titleImg}/>
            <div className="playlist-header__infosection">
                <div className="playlist-heder__text-box">
                    <h2>{props.title}</h2>
                    <h4>{props.description}</h4>
                </div>
            </div>
        </header>
    )
}

export default PlaylistHeader