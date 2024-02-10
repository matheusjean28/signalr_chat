import axios from "axios";
import "../../Styles/Login.css";
import React, { useState, useContext } from "react";
import AnimationsContent from "../AnimationsContent";
import AppContext from "../../Context/AppContext";
import LoginForm from "./Other/LoginForm";
import CreateAccount from "./Other/CreateAccount";

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
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }


  const handlerLoginPost = async () => {
    try {
      console.log(passwordInput, nameInput)
      const response = await axios.post(`http://localhost:5178/Auth`, {
        UserName: nameInput,
        Email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        setUsername(response.data.userName);
        setIsLoged(true);

        const newUserData = {
          Id: response.data.id,
          UserName: response.data.userName,
          picProfile: "",
          Gender: "",
          bio: "",
        };
        console.log(response)
        setUserInfo(newUserData);
      } else {
        console.error(`Unexpected response status: ${response.AxiosError}`);
        throw new Error(response.AxiosError)


      }
    } catch (error) {
      console.log("An error occurred during login:", error.response.data);
      console.log(error)
      var _stringMessage;
      if (error.response && error.response.data) {
        _stringMessage = `An error occurred: ${error.response.data}`;
      } else {
        _stringMessage = "An unknown error occurred during login.";
      } showError(_stringMessage);
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
        {true ? <CreateAccount /> : <LoginForm
          setNameInput={setNameInput}
          setEmailInput={setEmailInput}
          setPasswordInput={setPasswordInput}
          handlerLoginPost={handlerLoginPost}
          setUsername={setUsername}
          setIsLoged={setIsLoged}
        />}

      </div>
    </React.Fragment>
  );
};

export default Login;
