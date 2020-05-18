import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Playlists = () => {
    const [categories, setCategories ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://beuthbox.beuth-hochschule.de/api/graphql?query={categories{name, description, created, imagepath, iconpath _id}}")
                setCategories(result.data.data.categories)
            }
            catch(error) { console.log(error)}
        }
        fetchData()
    }, [])
    if( categories) {
        return categories.map(categorie  => {
           return ( <div>
                <a href={`/playlist/${categorie._id}`}>
                    {categorie.name}
                </a>
            </div>
            )
        })
    }
    return (
        <div>
            Playlists werden geladen...
        </div>
    )
}

export default Playlists