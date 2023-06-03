import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/loginPage/form";
import background from "../../assets/images/landing.jpg";
import logo from "../../assets/images/pharma.png";
import "./loginView.css";
import getEnvironnement from "../../environnement";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRole, setUser } from "../../store/userSlice";

function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorLogin, setErrorLogin] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = `${getEnvironnement().API_URL}/login`;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(url, { email, password })
      .then((response) => {
        dispatch(setUser(response.data.user));
        dispatch(setRole(response.data.role));
        // Redirect to "/pharma"
        navigate("/pharma");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="LoginPage">
      <img src={background} alt="" className="LoginBackgound" />
      <div className="overBackround">
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="Logo">
        <img src={logo} alt="" className="LoginLogo" />
        <h3 className="LoginLogoName">Pharma</h3>
      </div>
    </div>
  );
}

export default LoginView;
