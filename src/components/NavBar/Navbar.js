import React from "react";
import { useSelector } from 'react-redux';
import LeftMenu from "./Menu/LeftMenu";
import RightMenu from "./Menu/RightMenu";
import MobileMenu from "./Menu/MobileMenu";
import Search from '../Search/Search';
import logo from "../../assets/logo.png";
import "./navbar.less";

const Navbar = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      <nav className="menuBar">
        <div className="logo">
          <a href="/"><img className="logo_img" alt="goveera_logo" src={logo} /></a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
        </div>
        {isAuth && user.company &&
          <div className='menu_search'>
            <Search />
          </div>}
      </nav>
      <nav className="mobile_bar">
        <MobileMenu />
      </nav>

    </div>
  );
};

export default Navbar;
