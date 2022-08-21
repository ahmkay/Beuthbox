import React, {useContext} from 'react'
import {DataContext} from '../../api/DataContext';
import NoContent from '../../components/reusables/NoContent';
import ThumbnailGrid from '../../components/reusables/ThumbnailGrid'

const Recommendations = () => {
    const {allVideos} = useContext(DataContext);

    const filterVideos = allVideos.filter(video => video.access === 'public' && video.status === 'finished')
    console.log({filterVideos})
    return (
        <main className=" main">
            <h2 className="search-headline"> Deine Ergebnisse liefern die folgende Video Auswahl</h2>


            <div className=" recommended-videos container-90">
                <h3 className="result-headline">Videos</h3>
                <ThumbnailGrid
                    type="video"
                    elements={filterVideos.slice(0, 10)}
                    columnNumber={4}
                />
                {allVideos.length < 1 && <NoContent content="video" />}
            </div>

        </main>
    )

}

export default Recommendations