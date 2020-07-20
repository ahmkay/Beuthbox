import React, { useContext } from "react";
import MultiCarousel from "../../components/reusables/MutliCarousel";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Playlists = () => {
  const { playlistData } = useContext(DataContext);

  return (
    <main className="main">
      <section className="main__section">
        <header className="section-header">
          <h1 className="page-headline">Playlists</h1>
        </header>
        {playlistData.length ? (
          <MultiCarousel isPlaylist />
        ) : (
          <ActivityIndicator position="inline" />
        )}
      </section>
    </main>
  );
};

export default Playlists;
