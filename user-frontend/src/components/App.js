import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AboutUs from '../routes/aboutus/AboutUs';
import Playlists from '../routes/playlists/Playlists';
import Playlist from '../routes/playlists/Playlist';
import Video from '../routes/video/Video';
import Channel from '../routes/channel/Channel';
import Channels from '../routes/channel/Channels';
import Home from '../routes/home/Home';
import './styles.sass';
import Footer from './reusables/Footer'

const App = () => {
  return (
    <Router>
      <Route
      path={'/aboutus'}
      component={AboutUs}
      />
      <Route
      exact
      path={'/playlist'}
      component={Playlists}
      />
      <Route
      path={'/playlist/:id'}
      component={Playlist}
      />
      <Route
      path={'/video/:id'}
      component={Video}
      />
      <Route
      exact
      path={'/channel/'}
      component={Channels}
      />
      <Route
      path={'/channel/:id'}
      component={Channel}
      />
      <Route
      exact
      path={'/'}
      component={Home}
      />
      <Footer />
    </Router>
  )
}

export default App;
