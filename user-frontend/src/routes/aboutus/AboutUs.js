import React, {useState, useEffect } from 'react'
import axios from 'axios'

const AboutUs = () => {
    const [data, setData ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://beuthbox.beuth-hochschule.de/api/graphql?query={categories{name, description, created, imagepath, iconpath _id}}")
                setData(result.data.data.categories)
                
            }
            catch(error) { console.log(error)}
        }
        fetchData()
    }, [])
    if( data) {
        console.log(data)
    }
    return (
        <div>
            About US Screen
        </div>
    )
}

export default AboutUs