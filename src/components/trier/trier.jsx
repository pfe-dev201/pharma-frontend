import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as Trie} from "../../assets/icons/trier.svg";
import "./trier.css";

function Trier({ onClickTrier }) {
  return (
    <div className="trier" onClick={onClickTrier}>
      <Trie />
      <span>trier</span>
    </div>
  );
}

Trier.propTypes = {
  onClickTrier: PropTypes.func.isRequired,
};

export default Trier;