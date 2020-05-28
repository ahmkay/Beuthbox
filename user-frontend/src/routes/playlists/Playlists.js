import React, {useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistsCarousel from '../../components/reusables/PlaylistsCarousel'

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
        return (
            <main className="main">
                <section className="playlists-section">
                    <header className="section-header">
                    <h1>Playlists</h1>
                    <h2>Entdecke die Sammlung der neusten Playlisten</h2>
                    </header>
                    <PlaylistsCarousel playlists={categories}/>
                </section>
            </main>
        )
    }
    return (
        <main className="main">
            <div>
                Playlists werden geladen...
            </div>
        </main>
    )
}

export default Playlists