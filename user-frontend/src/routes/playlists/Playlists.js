import React, { useContext } from "react";
import MultiCarousel from "../../components/reusables/MutliCarousel";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";

const Playlists = () => {
  const { playlistData } = useContext(DataContext);

  return (
    <main className="main">
      <section className="main__section">
        <header className="section-header">
          <h1 className="page-headline">Playlists</h1>
        </header>
        {playlistData.length ? (
          <>
            <section className="main__section">
              <h2>Neuste Playlists</h2>
              <MultiCarousel
                type="playlist"
                elements={playlistData.slice(0, 4)}
              />
            </section>
            <section className="main__section">
              <h2>Übersicht</h2>
              <ThumbnailGrid
                type="playlist"
                elements={playlistData}
                columnNumber={4}
              />
            </section>
          </>
        ) : (
          <ActivityIndicator position="inline" />
        )}
      </section>
    </main>
  );
};

export default Playlists;
