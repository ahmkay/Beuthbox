import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import ChannelOverview from "../../components/reusables/ChannelOverview";
import PlaylistsCarousel from "../../components/reusables/PlaylistsCarousel";
import VideoRow from "../../components/reusables/VideoRow";
import LiveInfoLayer from '../../components/LiveInfoLayer'
import VideoFilter from '../../components/reusables/VideoFilter'

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import ReactFlowPlayer from "react-flow-player";

const Home = ({ channelData, playlistData }) => {
  const [sliders, setSliders] = useState([]);
  const [recommendations, setRecommendations] = useState([])
  const [furtherVideos, setFurtherVideos ] = useState([])
  const [mainslider, setMainslider] = useState([]);
  const list = useRef(null);

  useEffect(() => {
    function compare(a, b) {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    }
    const fetchData = async () => {
      try {
        const slider = await axios.get(
          `${BASEURL}/graphql?query={sliders{name, position, occurrence, active, videos{position, _id{name, posterImagePath, _id, videoDuration, created }}}}`
        );
        const mainslider = await axios.get(`${BASEURL}/slider`);
        mainslider.data.sort(compare);
        slider.data.data.sliders.sort(compare);
        slider.data.data.sliders.forEach((slider, k) => {
          slider.videos.sort(compare);
        });


        let recommendedVideos =  slider.data.data.sliders.filter(slider => slider.name === 'Empfohlene Videos')
        recommendedVideos = recommendedVideos[0].videos
        let filteredRecommendedVideos = recommendedVideos.map(video => video._id)

        let furtherVideos =  slider.data.data.sliders.filter(slider => slider.name === 'Sonstige Videos')
        furtherVideos = furtherVideos[0].videos
        let filteredFurtherVideos = furtherVideos.map(video => video._id)

        
        setRecommendations(filteredRecommendedVideos)
        setFurtherVideos(filteredFurtherVideos)
        setSliders(slider.data.data.sliders);
        setMainslider(mainslider.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

 
  // owl carousel

  const showSlider = () => {
    return sliders.map((slide) => {
      return (
        <>
          <h3 class="">{slide.name}</h3>
          <div class="">
            {slide.videos.map((video) => {
              return (
                <div class="">
                  <div class="">
                    <a href={`/video/${video._id._id}`}>
                      {video._id.posterImagePath.indexOf("engage-player") >
                      1 ? (
                        <img class="" src={video._id.posterImagePath} />
                      ) : (
                        <img
                          class=""
                          src={`${BASEURL}/videos${video._id.posterImagePath}`}
                        />
                      )}
                    </a>
                    <div class="">
                      <a href={`/video/${video._id._id}`}>
                        <div class="">{video._id.name}</div>
                        <div class="">
                          <div class="">
                            <span class="glyphicon glyphicon-calendar"></span>
                            {video._id_created}
                          </div>
                          <div class="">
                            <span class="glyphicon glyphicon-time"></span>
                            {video._id.videoDuration}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    });
  };
  if (sliders && recommendations) {
    return (
      <main className="main">
        <VideoFilter />
        <LiveInfoLayer />

        <ChannelOverview
          channelData={channelData}
          channelInfo="Test Info Beschreibung"
        />
        <section className="main__section">
          <header className="section-header">
            <h1>Playlists</h1>
            <h2>Entdecke die Sammlung der neusten Playlisten</h2>
          </header>
          <PlaylistsCarousel playlists={playlistData}/>
        </section>
        <section className="main__section">
          <header className="section-header">
            <h1>Videos</h1>
            <h2>Schaue dir unsere Empfehlungen der spannensten und interessanten Videos der beuthBOX an </h2>
          </header>
         <VideoRow headline={'Empfehlungen der Woche'} amountOfVideos={4} videos={recommendations}/>
         <VideoRow headline={'Neuste Videos'} amountOfVideos={4} videos={furtherVideos}/>

        </section>
        <div class="container-fluid content">{showSlider()}</div>

        {/* <ReactFlowPlayer
                    </>
                )
            })
        )
    }
    if( sliders) {
       return (
           <>
            <LiveInfoLayer />
            <div class='container-fluid content'>
                {showSlider()}
            </div>
            
            {/* <ReactFlowPlayer
            live
            autoplay
            aspectRatio='16:9'
            licenceKey='$863732616083910, $168467931371094'
            hlsQualities
            hlsjs= {{
                // catch otherwise non-fatal levelLoadTimeout
                listeners: ["hlsError"]
            }}
            adaptiveRatio
            onError={(obj, flow, error) => {
                var container = document.getElementById("reactFlowPlayer")
                var messagecontainer = document.createElement("div")
                messagecontainer.setAttribute('class', 'prefix')
                container.querySelector('.fp-message').appendChild(messagecontainer) 
                    var detail = document.createElement("p")
                   var header = document.createElement("h2")
                    messagecontainer.setAttribute('class', 'error-message-container')
                    container.querySelector('.fp-message').appendChild(messagecontainer)
                    container.querySelector('.error-message-container').appendChild(header)
                    container.querySelector('.error-message-container').appendChild(detail)
                    detail.innerHTML = "28. Januar 2020, 13:00 Uhr"
                    header.innerHTML = "Stay tuned!"
                }
            
        }
  playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
  playerId="reactFlowPlayer"
  sources={[
    {
      type: "application/x-mpegurl",
      src: "http://141.64.64.18:1935/live/ngrp:beuthbox_all/playlist.m3u8"
    }
  ]}
/>; */}

        <ul ref={list} className={"clicker"}>
          <li>1</li>
          <li>2</li>
        </ul>

        <p className="testeintrag">Testeinbtrag</p>
        <div class="container">
          <div id="starTrekContainer">
            <div id="ContainerTitle">
              <h1 class="hero-title">
                Vortragsveranstaltung der Regionalgruppe Berlin
              </h1>
              <br />
              <h3 class="hero-subtitle">
                28. Januar 2020, 13:00 Uhr Haus Gauß, Raum B501
              </h3>
            </div>

            <div id="player_Container">
              <img
                src="../assets/HG-bild-HST2019-weich.jpg"
                id="StarTrekImage"
              />
              <div id="live" class="flowplayer playerLive"></div>
              <p id="chromeWarning">
                Google Chrome may cause error with live stream. Please use
                Firefox or Internet Explorer instead.
              </p>
            </div>

            <p id="linkbox_live">
              {" "}
              Informationen zur Veranstaltung:
              <a
                href="https://www.fed.de/veranstaltungen/termin/vortragsveranstaltung-der-regionalgruppe-berlin-8/"
                target="_blank"
              >
                {" "}
                hier
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }
  return <div>Home</div>;
};

export default Home;
