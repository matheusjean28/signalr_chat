import "../Styles/Login.css";
import React, { useState, useContext } from "react";
import AnimationsContent from "./AnimationsContent";
import AppContext from "../Context/AppContext";
const Login = () => {
  const { login, setLogin, isLoged, setIsLoged } = useContext(AppContext);
  console.log(isLoged);

  const [loginCreadentials, setLoginCreadentials] = useState({
    name: String,
    email: String,
    password: String,
  });
  /*to compose login credential */
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  /*to compose user input */
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const isStrongPassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLength && hasUppercase && hasLowercase && hasNumber;
  };

  const handlerLogin = () => {
    if (nameInput === "teste") {
      setName(true);
    }
    if (emailInput === "123456") {
      setPassword(true);
    }
    if (passwordInput === "123456") {
      setEmail(true);
    }
    console.log("here isLoged", isLoged.value);

    setIsLoged(name && email && password);
  };

  return (
    <React.Fragment>
      <div className="LoginConteiner">
        <AnimationsContent />
        <form className="RigthLoginConteiner" action="#">
          <h1>Dive in full bullshit!</h1>
          <h4>
            Make sure <br /> you ready!{" "}
          </h4>

          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={(e) => {
              e.preventDefault();
              setNameInput(e.target.value);
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              e.preventDefault();
              setEmailInput(e.target.value);
            }}
          />
          <input
            type="password"
            name="passord"
            placeholder="Passord"
            onChange={(e) => {
              e.preventDefault();
              setPasswordInput(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handlerLogin();
            }}
          >
            LOGIN
          </button>
          <button onClick={(e) => {
              e.preventDefault();
              setIsLoged(true);
            }} >Anonim Login</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
