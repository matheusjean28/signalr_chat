import "../Styles/Login.css";
import React, { useState, useContext } from "react";
import AnimationsContent from "./AnimationsContent";
import AppContext from "../Context/AppContext";
const Login = () => {
  const { login, setLogin } = useContext(AppContext);
  console.log(login);

  const [loginCreadentials, setLoginCreadentials] = useState({
    name: String,
    email: String,
    password: String,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isStrongPassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasLength && hasUppercase && hasLowercase && hasNumber;
  };

  var teste = "R9r11rg49!";
  console.log(isStrongPassword(teste));

  return (
    <React.Fragment>
      <div className="LoginConteiner">
        <AnimationsContent />
        <form className="RigthLoginConteiner" action="#">
            <h1>Dive in full bullshit!</h1>
            <h4>Make sure  <br/> you ready! </h4>

          <input type="text" name="username" placeholder="User Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="passord" placeholder="Passord" />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            LOGIN
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
