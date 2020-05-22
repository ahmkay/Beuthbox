import React, {useState, useEffect} from 'react';
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
import Live from '../routes/live/Live';
import Navbar from './reusables/Navbar';
import { BASEURL } from '../api';
import axios from 'axios';

const App = () => {
  const [channels, setChannels ] = useState([])
  useEffect(() => {
      const fetchData = async () => {
          try {
             
              const response = await axios.get(BASEURL + "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}")
              const channels = response.data.data.channels.filter(channel => {
                  return channel.ispublic
              });
              setChannels(channels)
          }
          catch(error) { console.log(error)}
      }
      fetchData()
  }, [])
  
  return (
    <Router>
      
      <Navbar />

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
      component={() => <Channels channelData={channels} />}
      />
      <Route
      path={'/channel/:id'}
      component={Channel}
      />
     
      <Route
      exact
      path={'/'}
      component={() => <Home channelData={channels}/>}
      />

      <Route
      exact
      path={'/live'}
      component={Live}
      />
      
      <Footer />
    </Router>
  )
}

export default App;
