import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as Filtre} from "../../assets/icons/filter.svg";
import "./filtrer.css";

function Filtrer({ onClickFiltrer, active }) {
  return (
    <div className={`filtrer ${active ? "active-filtre" : ""}`} onClick={onClickFiltrer}>
      <Filtre />
      <span style={active ? {color: "#A70505"} : {}}>filtrer</span>
    </div>
  );
}

Filtrer.propTypes = {
  onClickFiltrer: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default Filtrer;