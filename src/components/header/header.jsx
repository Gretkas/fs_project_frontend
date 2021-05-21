//fra sys2 prosjekt
import "./header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";

import { useMediaQuery } from "react-responsive";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Header = (props) => {
  const handleLogOut = () => {
    //props.logout();
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [navbarOpen, setNavbarOpen] = useState(false);
  // const [userInfoOpen, setuserInfoOpen] = useState(false);

  const toggleNavBar = () => {
    setNavbarOpen((previous) => !previous);
  };

  //const toggleUserInfo = () => {
  //  setuserInfoOpen((previous) => !previous);
  //};

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const renderHeader = () => {
    if (!props.user) {
      return <></>;
    } else if (isTabletOrMobile) {
      return (
        <>
          <div className="topbar-container-mobile">
            <button onClick={toggleNavBar}>
              <div className={navbarOpen ? "bar1 change" : "bar1"}></div>
              <div className={navbarOpen ? "bar2 change" : "bar2"}></div>
              <div className={navbarOpen ? "bar3 change" : "bar3"}></div>
            </button>


            

          </div>
          <ul className={`topbar-navbar ${navbarOpen ? " showMenu" : ""}`}>
            <li>
              <Link to="/" onClick={toggleNavBar}>
                <h2>Home</h2>
              </Link>
              <hr />
            </li>
            <li>
              <Link to="/rooms" onClick={toggleNavBar}>
                <h2>Rooms</h2>
              </Link>
              <hr />
            </li>
            {props.isAdmin? 
            <li>
              <Link to="/admin" onClick={toggleNavBar}>
                <h2>Admin</h2>
              </Link>
              <hr />
            </li> :
            ""}
          </ul>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">Hjem</Link>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
            >
              <Link to="/login">Logg ut</Link>
            </MenuItem>
          </Menu>
        </>
      );
    } else {
      return (
        <>
          <div className="topbar-container">
            <div className="navigation-container">
              <Link to="/">
                <h2>Home</h2>
              </Link>

              <Link to="/rooms">
                <h2>Rooms</h2>
              </Link>
              {props.isAdmin? 
              <Link to="/admin" onClick={toggleNavBar}>
                <h2>Admin</h2>
              </Link>:
            ""}

            </div>
          
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">Hjem</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/account">Konto</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
            >
              <Link to="/login">Logg ut</Link>
            </MenuItem>
          </Menu>
        </>
      );
    }
  };
  return <div>{renderHeader()}</div>;
};

export default connect(null, {}, null, {
  forwardRef: true,
})(Header);
