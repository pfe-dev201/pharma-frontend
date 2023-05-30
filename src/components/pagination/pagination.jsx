import React from "react";
import PropTypes from "prop-types";
import "./paginationStyle.css";

function Pagination({ onClickLeft, numberLeft, numberRight, onClickRight, disabledLeft, disabledRight}) {
  return (
    <div className="pagination">
      <div className={`boutton-pagination ${disabledLeft ? "disabled-btn-pagination" : ""}`} onClick={onClickLeft}>
        <p>{"<"}</p>
      </div>
      <span className="number">{`${numberLeft} - ${numberRight}`}</span>
      <div className={`boutton-pagination ${disabledRight ? "disabled-btn-pagination" : ""}`} onClick={onClickRight}>
        <p>{">"}</p>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  numberLeft: PropTypes.number.isRequired,
  numberRight: PropTypes.number.isRequired,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
  disabledLeft: PropTypes.bool.isRequired,
  disabledRight: PropTypes.bool.isRequired,
};

export default Pagination;