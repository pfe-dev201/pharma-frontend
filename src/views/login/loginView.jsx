import React from "react";
import LoginForm from "../../components/loginPage/form";
import background from "../../assets/images/landing.jpg";
import logo from "../../assets/images/pharma.png";
import "./loginView.css";

function LoginView() {
  return (
    <div className="LoginPage">
      <img src={background} alt="" className="LoginBackgound"/>
      <div className="overBackround">
        <LoginForm/>
      </div>
      <div className="Logo">
        <img src={logo} alt="" className="LoginLogo"/>
        <h3 className="LoginLogoName">Pharma</h3>
      </div>
    </div>
  );
}

export default LoginView;
