import React from "react";
import PropTypes from "prop-types";

function LoginForm({ setEmail, setPassword, handleSubmit }) {

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <p>Se connecter</p>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="nom d’utilisateur"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="userPass"
          id="userPass"
          placeholder="mot de passe"
          onChange={handlePasswordChange}
        />
        <button type="submit" className="loginSubmit">Se connecter</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;
