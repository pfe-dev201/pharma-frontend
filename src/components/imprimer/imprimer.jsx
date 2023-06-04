import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as Printer} from "../../assets/icons/printer.svg";
import "./imprimer.css";

function Imprimer({ onClickFiltrer, active }) {
  return (
    <div className={`print ${active ? "active-print" : ""}`} onClick={onClickFiltrer}>
      <Printer />
      <span style={active ? {color: "#A70505"} : {}}>imprimer</span>
    </div>
  );
}

Imprimer.propTypes = {
  onClickFiltrer: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default Imprimer;