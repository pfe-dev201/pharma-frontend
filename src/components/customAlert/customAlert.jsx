import React from "react";
import PropTypes from "prop-types";
import "./customAlertStyle.css";

function CustomAlert({ open, status, children }) {
  return (
    <div className="customAlert" style={open ? {} : {display: "none"}}>
      <div className="alert">
        <div className="status" style={status === "success" ? { backgroundColor: "#4B7D4A" } : { backgroundColor: "#A70505" }}></div>
        <p>{children}</p>
      </div>
    </div>
  );
}

CustomAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default CustomAlert;