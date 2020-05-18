import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import AboutUs from './routes/AboutUs';
import Playlists from './routes/Playlists';
import Playlist from './routes/Playlist';
import Video from './routes/Video';
import Channel from './routes/Channel';
import Channels from './routes/Channels';
import Home from './routes/Home';

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
    </Router>
    
  )
}

export default App;
