import React from "react";

function LoginForm() {
  return (
    <div className="LoginForm">
      <form action="#">
        <p>Se connecter</p>
        <input type="text" name="userName" id="userName" placeholder="nom d’utilisateur" />
        <input type="password" name="userPass" id="userPass" placeholder="mot de passe" />
        <button type="submit" className="loginSubmit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;
