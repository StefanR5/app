import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import slika from "../src/images/menu.jpg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.LocalStorageClear = this.LocalStorageClear.bind(this);
  }

  LocalStorageClear() {
    localStorage.clear();
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-primary fixed-top">
        <div className="proba">
          <span onClick={this.openNav} className="navbar-nav">
            <img className="icon" src={slika} alt="" />
          </span>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link to="/maincomp" className="dugme">
                Pocetna Strana
              </Link>
            </li>
          </ul>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link to="/login" className="dugme">
                  Sign in
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/sign-up" className="dugme">
                  Sign up
                </Link>
              </li>
              <li id="logout" className="nav-item">
                <Link
                  onClick={this.LocalStorageClear}
                  to="/logout"
                  className="dugme"
                >
                  Log out
                </Link>
              </li>
            </ul>
          </div>
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={this.closeNav}>
              &times;
            </a>
            <a href="#">O nama</a>
            <a href="#">Savjeti i Vijesti</a>
            <a href="#">Klijenti</a>
            <a href="#">Kontakt</a>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
