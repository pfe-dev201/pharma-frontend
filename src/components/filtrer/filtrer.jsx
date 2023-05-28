import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as Filtre} from "../../assets/icons/filter.svg";
import "./filtrer.css";

function Filtrer({ onClickFiltrer }) {
  return (
    <div className="filtrer" onClick={onClickFiltrer}>
      <Filtre />
      <span>filtrer</span>
    </div>
  );
}

Filtrer.propTypes = {
  onClickFiltrer: PropTypes.func.isRequired,
};

export default Filtrer;