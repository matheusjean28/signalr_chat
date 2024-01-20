import axios from "axios";
import "../Styles/Login.css";
import React, { useState, useContext } from "react";
import AnimationsContent from "./AnimationsContent";
import AppContext from "../Context/AppContext";
const Login = () => {
  const { login, setLogin, isLoged, setIsLoged, setUsername, setUserInfo } = useContext(AppContext);

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
    // if (nameInput === "teste") {
    //   setName(true);
    if (emailInput === "123456") {
      setPassword(true);
    }
    if (passwordInput === "123456") {
      setEmail(true);
    }
    console.log("here isLoged", isLoged.value);

    // put herelocical to sync user info before logged
    // setUserInfo(userinfo.userName)
    setIsLoged(email && password);
  };

  const _userLogin = {
    UserName: 'asd',
    Email: "asd",
    Password: "asdf",
    Gender: 'asdf'
};

  const handlerLoginPost = async () => {
    try {


      const response = await axios.post(`http://localhost:5178/Auth?UserName=${nameInput}&Email=${_userLogin.Email}&Pass=${_userLogin.Password}&Gener=${_userLogin.Gender}`
      );
      if (response.data) {
        console.log(response.data)
        setUsername(response.data.userName);
        setIsLoged(true);
        setUserInfo(response.data)
      } else {
        console.log("Login failed:", response);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };
  //check if username is right
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
              setUsername(e.target.value.trim());
              setNameInput(e.target.value)
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
              // handlerLogin();
              handlerLoginPost()
            }}
          >
            LOGIN
          </button>
          <button onClick={(e) => {
            e.preventDefault();
            setUsername("<anonim user!>")
            setIsLoged(true);
          }} >Anonim Login</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
