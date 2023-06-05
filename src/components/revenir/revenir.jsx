import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as RevenirIcon} from "../../assets/icons/revenir.svg";
import "./revenir.css";

function Revenir({ onClickRevenir, active }) {
  return (
    <div className={`return ${active ? "active-return" : ""}`} onClick={onClickRevenir}>
      <RevenirIcon />
      <span style={active ? {color: "#A70505"} : {}}>Revenir au stock</span>
    </div>
  );
}

Revenir.propTypes = {
  onClickRevenir: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default Revenir;