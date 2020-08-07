import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import Logo from "./Branding/Logo";

function Header() {
  return (
    <div className="header">
      <div className="flex">
        <Logo className="header-logo" />
        <NavLink to="/" className="header-title">
          Tech News
        </NavLink>
        <NavLink to="/" className="header-link">
          New
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          Top Rated
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          Search
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/create" className="header-link">
          Submit
        </NavLink>
      </div>
      <div className="flex">
        <NavLink to="/login" className="header-link-login">
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);
