import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Channels = (props) => {
    const baseURL = 'http://beuthbox.beuth-hochschule.de/api'
    const [channels, setChannels ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const response = await axios.get(baseURL + "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}")

                const channels = response.data.data.channels.filter(channel => {
                    return channel.ispublic
                });
                setChannels(channels)
            }
            catch(error) { console.log(error)}
        }
        fetchData()
        console.log(props, 'props')
    }, [])

   
    if(channels) {
        return channels.map(channel  => {
            return (
            <div class="categoryContainer">
            <a href={`/channel/${channel._id}`}>
                <img src={`${baseURL}/channel${channel.imagepath}`} class="categoryImage" />
            </a>
            <a href={`channel/${channel._id}`} class="title link-unstyled titleCatNew">{channel.name}</a>
            <p class="descriptionSmall">{channel.description}></p>
        </div>
             )
         })
    }
    return (
        <div>
            Channels
        </div>
    )
}

export default Channels