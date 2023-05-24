import React from "react";
import {ReactComponent as Filtre} from "../../assets/icons/filter.svg";
import "./filtrer.css";

function Filtrer() {
  return (
    <div className="filtrer">
      <Filtre />
      <span>filtrer</span>
    </div>
  );
}

export default Filtrer;