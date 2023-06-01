import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as Trie} from "../../assets/icons/trier.svg";
import "./trier.css";

function Trier({ onClickTrier, active }) {
  return (
    <div className={`trier ${active ? "active-trie" : ""}`} onClick={onClickTrier}>
      <Trie />
      <span style={active ? {color: "#A70505"} : {}}>trier</span>
    </div>
  );
}

Trier.propTypes = {
  onClickTrier: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default Trier;