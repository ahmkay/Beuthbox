import React from 'react'

function ChannelHeader({title, img, description}) {
    return (
        <header className="channel-header">
            <img src={img} alt="Header Image" className="channel-header__img"/>
            <div className="channel-header__overlay">
                <div className="channel-header__content">
                    <div className="channel-header__title-box">
                        <h1 className="channel-header__title">{title}</h1>
                    </div>
                    <h3 className="channel-header__description">{description}</h3>
                </div>
            </div>
        </header>
    )
}

export default ChannelHeader
