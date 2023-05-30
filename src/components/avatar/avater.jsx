import React from "react";
import PropTypes from "prop-types";
import "./avatarStyle.css";

function Avatar({ image, nom, prenom }) {
  return (
    <div className="avatar">
      <div className="img-avatar">
        <img src={image} alt=""/>
      </div>
      <p>{`${prenom} ${nom}`}</p>
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
};

export default Avatar;