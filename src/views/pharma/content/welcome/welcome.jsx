import React from "react";
import logo from "../../../../assets/images/pharma.png";
import "./welcomeStyle.css";

function Welcome () {
  return (
    <div className="Welcome">
      <p className="bienvenu-text">
        BIENVENU DANS VOTRE <br/>
        GESTIONNAIRE DU STOCK <br/>
        PHARMA
      </p>
      <div className="bg-imgLogo">
        <img className="logoBienvenu" src={logo} alt=""/>
        <p className="logoNameBienvenu">pharma</p>
      </div>
    </div>
  );
}

export default Welcome;