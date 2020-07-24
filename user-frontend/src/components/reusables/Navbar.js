import React, {
  useState,
  useLayoutEffect,
  useContext,
  useRef,
  useEffect,
} from "react";
import HomeIcon from "@material-ui/icons/Home";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import Videocam from "@material-ui/icons/Videocam";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import SearchMobile from "../../routes/search/SearchMobile";
import Button from "./Button";
import { preventBackgroundScroll } from "../../utils";
import { DataContext } from "../../api/DataContext";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [leftPosition, setLeftPosition] = useState(null);
  const [indicatorWidth, setIndicatorWidht] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const { setQuery } = useContext(DataContext);
  const { pathname } = useLocation();
  let activeRef = useRef(null);

  // to move to active indicator
  const moveIndicator = () => {
    // Wait some time to make sure the ref is not null
    // TODO: make async
    setTimeout(function () {
      if (activeRef.current == null) {
        return;
      }
      setLeftPosition(activeRef.current.getBoundingClientRect().left + "px");
      setIndicatorWidht(activeRef.current.getBoundingClientRect().width + "px");
    }, 100);
    // if(activeRef.current == null) {
    // }
    //setLeftPosition(activeRef.current.getBoundingClientRect().left + 'px')
    //setIndicatorWidht(activeRef.current.getBoundingClientRect().width + git 'px')
  };

  const setNavbar = () => {
    setIsMobile(window.innerWidth < 576);
    if (window.innerWidth < 576) preventBackgroundScroll(false);
  };

  // took this from: https://reactrouter.com/web/guides/scroll-restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMobileSearch = (show = false) => {
    preventBackgroundScroll(show);
    setShowNav(show); // to close gap on top of the mobile search caused of hidden navbar
    setShowMobileSearch(show);
  };

  // move Indicator every time the window resizes
  useLayoutEffect(() => {
    if (activeRef !== null) {
      window.addEventListener("resize", () => {
        moveIndicator();
        setNavbar();
      });
    }
    if (!showMobileSearch) {
      window.addEventListener("scroll", hideOnScroll); // prevent to move search modal because it sets its position relative to the navbar
    }
    return () => {
      window.removeEventListener("resize", () => {
        moveIndicator();
        setNavbar();
      });
      window.removeEventListener("scroll", hideOnScroll);
    };
  });

  const getActiveRoute = (route, location, match) => {
    if (!match) {
      return;
    }
    location.pathname === route ? setActiveTab(route) : setActiveTab("");
    moveIndicator();
  };

  const hideOnScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShowNav(document.body.getBoundingClientRect().top > scrollPos);
  };

  const history = useHistory();
  const showSearchResult = (query) => {
    history.push(`/search/name=${query}`);
  };

  const evaluateSearch = async (event, value) => {
    const { key, type } = event;
    let trimmedValue = value.trim();

    if (key === "Enter") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }

      console.log(trimmedValue.length, "kein wert gefunden");

      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    } else if (type === "click") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }
      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    }
  };

  return (
    <nav
      className={`nav nav${isMobile ? "--isMobile" : "--isDesktop"} ${
        showNav ? "show" : ""
      }`}
    >
      {isMobile && (
        <>
          <SearchMobile
            show={showMobileSearch}
            state="entering"
            toggleShow={toggleMobileSearch}
          />
          <Button
            onClick={() => toggleMobileSearch(true)}
            type="icon"
            filled
            className="nav__mobile-search"
          >
            <SearchIcon />
          </Button>
        </>
      )}
      <div className="nav__flex-container">
        {!isMobile && (
          <div className="nav__searchbar-flex-container">
            <input
              className="nav__searchBar"
              type="text"
              name="suche"
              placeholder="Video, Playlist, Channel, Stichwort..."
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => evaluateSearch(event, inputValue)}
            />
            <SearchIcon
              className="nav__searchbar-flex-container-searchbar-icon"
              onClick={(event) => evaluateSearch(event, inputValue)}
            />
          </div>
        )}
        <ul className="nav-ul">
          <li
            className="nav__element"
            ref={activeTab === "/" ? activeRef : null}
          >
            <NavLink
              to="/"
              exact
              className={`nav-link${activeTab === "/" ? "--isActive" : ""}`}
              activeClassName="isActive"
              isActive={(match, location) =>
                getActiveRoute("/", location, match)
              }
            >
              <HomeIcon className="nav__icon" />
              Home
            </NavLink>
          </li>
          <li
            className="nav__element"
            ref={activeTab === "/channel" ? activeRef : null}
          >
            <NavLink
              to="/channel"
              exact
              className={`nav-link${
                activeTab === "/channel" ? "--isActive" : ""
              }`}
              activeClassName="isActive"
              isActive={(match, location) =>
                getActiveRoute("/channel", location, match)
              }
            >
              <LiveTvIcon className="nav__icon" />
              Channels
            </NavLink>
          </li>
          <li
            className="nav__element"
            ref={activeTab === "/playlist" ? activeRef : null}
          >
            <NavLink
              to="/playlist"
              exact
              className={`nav-link${
                activeTab === "/playlist" ? "--isActive" : ""
              }`}
              activeClassName="isActive"
              isActive={(match, location) =>
                getActiveRoute("/playlist", location, match)
              }
            >
              <PlaylistPlayIcon className="nav__icon" />
              Playlists
            </NavLink>
          </li>
          <li
            className="nav__element"
            ref={activeTab === "/live" ? activeRef : null}
          >
            <NavLink
              to="/live"
              exact
              className={`nav-link${activeTab === "/live" ? "--isActive" : ""}`}
              activeClassName="isActive"
              isActive={(match, location) =>
                getActiveRoute("/live", location, match)
              }
            >
              <FiberManualRecordIcon className="nav__icon nav__icon--live" />
              Live
            </NavLink>
          </li>
          <li
            className="nav__element"
            ref={activeTab === "/video-services" ? activeRef : null}
          >
            <NavLink
              to="/video-services"
              exact
              className={`nav-link${
                activeTab === "/video-services" ? "--isActive" : ""
              }`}
              activeClassName="isActive"
              isActive={(match, location) =>
                getActiveRoute("/video-services", location, match)
              }
            >
              <Videocam className="nav__icon" />
              Services
            </NavLink>
          </li>
          <span
            className={`nav__indicator${activeTab !== "" ? "--show" : ""}`}
            style={{ left: leftPosition, width: indicatorWidth }}
          ></span>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
