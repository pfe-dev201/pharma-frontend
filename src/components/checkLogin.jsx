import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userRoleSelector, userSelector } from "../store/userSlice";
import LoginView from "../views/login/loginView";
import ReglagesView from "../views/pharma/content/reglages/reglagesView";
import { useNavigate } from "react-router-dom";
import EntreesView from "../views/pharma/content/entrees/entreesView";
import SortiesView from "../views/pharma/content/sorties/sortiesView";

function CheckLogin({ Component }) {
  const user = useSelector(userSelector);
  const role = useSelector(userRoleSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ECRIRE-LIRE") {
      if (Component === ReglagesView) {
        navigate("/pharma");
      }
    } 
    if (role === "LIRE") {
      if (Component === EntreesView || Component === SortiesView) {
        navigate("/pharma");
      }
    }
  }, []);

  return (
    user === null ? <LoginView /> : <Component />
  );
}

CheckLogin.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default CheckLogin;