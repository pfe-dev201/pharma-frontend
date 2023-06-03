import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userSelector } from "../store/userSlice";
import LoginView from "../views/login/loginView";

function CheckLogin({ Component }) {
  const user = useSelector(userSelector);
  useEffect(() => {
    if(user){
      console.log(user.id);  
    } else {
      console.log(user);
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