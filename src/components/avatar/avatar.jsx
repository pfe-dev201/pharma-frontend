import React from "react";
import PropTypes from "prop-types";
import "./avatarStyle.css";

function Avatar({ image, nom, prenom, profile, handleImageChange, handleImageClick, inputRef }) {
  return (
    <div className="avatar">
      <div className="img-avatar">
        {profile
          ? (
            <div>
              <input
                type="file"
                name="image-profile"
                onChange={handleImageChange}
                ref={inputRef}
                style={{ display: "none" }}
                accept="image/*"
              />
              <div
                role="button"
                tabIndex={0}
                onClick={handleImageClick}
                onKeyDown={handleImageClick}
                style={{ cursor: "pointer", minHeight: "50px", minWidth: "100px" }}
              >
                <img
                  src={image}
                  alt=""
                />
              </div>
            </div>
          )
          : <img src={image} alt=""/>
        }
      </div>
      <p>{`${prenom} ${nom}`}</p>
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
  profile: PropTypes.bool,
  handleImageChange: PropTypes.func,
  handleImageClick: PropTypes.func,
  inputRef: PropTypes.object,
};

export default Avatar;