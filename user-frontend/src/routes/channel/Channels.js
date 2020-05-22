import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../api'
import ChannelOverview from '../../components/reusables/ChannelOverview'

const Channels = ( {channelData}) => {
  
    if(channelData) {
        return <ChannelOverview channelData={channelData} channelInfo='Entdecke die vorgestellten neuen Channels der Fachbereiche und Studiengänge' />
    }
    return (
        <div>
            channelData
        </div>
    )
}

export default Channels