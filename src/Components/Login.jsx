import axios from "axios";
import "../Styles/Login.css";
import React, { useState, useContext } from "react";
import AnimationsContent from "./AnimationsContent";
import AppContext from "../Context/AppContext";
import { DisabledTransportError } from "@microsoft/signalr/dist/esm/Errors";
const Login = () => {
  const { login, setLogin, isLoged, setIsLoged, setUsername, setUserInfo, userInfo } = useContext(AppContext);

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

  // error message to display
  const [errorMessage, setErrorMessage] = useState("");


  const isStrongPassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLength && hasUppercase && hasLowercase && hasNumber;
  };


  const showError = (errorMessage) => {
    console.log('funcai chanada')
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }


  const handlerLoginPost = async () => {
    try {
      const response = await axios.post(`http://localhost:5178/Auth`,
        {
          UserName: nameInput,
          Email: emailInput,
          Pass: passwordInput,
        }
      );


      if (response.status !== 200) {
        throw new Error;

      } else {
        setUsername(response.data.userName);
        setIsLoged(true);


        setUserInfo(response.data)
        const _newUserData = {
          Id: response.data.id,
          UserName: response.data.UserName,
          picProfile: "",
          Gender: "",
          bio: ""
        }
        setUserInfo(_newUserData)
      }
    } catch (error) {
      showError('UserName or Password Invalid! Check and try again...')
    }
  };
  //check if username is right
  return (
    <React.Fragment>
      <div className="LoginConteiner">
        <AnimationsContent />
        {errorMessage && (
          <div className="errorLogin">
            <p>{errorMessage}</p>
          </div>)
        }
        <form className="RigthLoginConteiner" action="#">
          <h1>Dive in full bullshit!</h1>
          <h4>
            Make sure <br /> you ready!
          </h4>

          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={(e) => {
              e.preventDefault();
              // setUsername(e.target.value.trim());
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

          {/* anonim login buton */}
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
