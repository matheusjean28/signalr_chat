import { React, useEffect, useState, signalR } from "./imports";

import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/LoginComponents/Login";
import ProfileSettings from "./Components/ProfileSettings";
import "./App.css";
import CreateRoom from "./Components/CreateRoom";
import ScreenErrorComponent from "./Components/ErrorComponent/ScreenErrorComponent";
import ConnectionStatus from "./Components/ConnectionStatus/ConnectionStatus";
import ErrorPopup from "./Components/ErrorComponent/ErrorPopup";


function App() {
  
  //make a file to handle this 'consts'
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
  const [stateConnection, setStateConnection] = useState(null)
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoged, setIsLoged] = useState(false);
  const [isInARoom, setIsInARoom] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const [chatName, setChatName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingARoom, setCreatingARoom] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Id: "",
    UserName: username,
    picProfile: "src/assets/editar.png ",
    Gender: "asdf",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  });

  const [renderError, setRenderError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .withAutomaticReconnect()
      .build();


    newConnection.onreconnecting(() => {
      setStateConnection("Reconnecting");
    });

    newConnection.onreconnected(() => {
      setStateConnection("Connected");
    });

    newConnection.onclose(async () => {
      console.log("call reconnection cause disconnected");
      await handleReconnection(newConnection);
    });

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
        setStateConnection("Connected");
      })
      .catch((error) => {
        console.error(error);
        setRenderError(true);
        setErrorMessage("Failed to connect to the server.");
        setTimeout(() => handleReconnection(newConnection), 5000);
      });

    return () => {
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 9000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  //leave this to first, will set as null
  useEffect(() => {
    setStateConnection(connection?.state);
  }, [connection]);

  //called when connection goes wrong
  const handleReconnection = async (connection) => {
    try {
      await connection.start();
      if (connection.connection.state === "Connected") {
        setRenderError(false);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error reconnecting:", error);
      setErrorMessage(error)
      setRenderError(true);
      setErrorMessage("Failed to reconnect.");
      setTimeout(handleReconnection, 1000);
    }
  };

  try {
    return (
      <AppContext.Provider
        value={{
          stateConnection, setStateConnection,
          isCreatingARoom,
          setCreatingARoom,
          currentChat,
          setCurrentChat,
          isEditing,
          setIsEditing,
          userInfo,
          setUserInfo,
          chatName,
          setChatName,
          isInARoom,
          setIsInARoom,
          isLoged,
          setIsLoged,
          login,
          setLogin,
          connection,
          setConnection,
          username,
          setUsername,
          recivedMessages,
          setRecivedMessages,
          renderError,
          setRenderError,
          errorMessage,
          setErrorMessage,
        }}
      >
        {errorMessage && (<ErrorPopup />)}
        {isLoged ? <ConnectionStatus /> : ""}
        {
          renderError ? <ScreenErrorComponent errorMessage={errorMessage} /> :
            isLoged ? (
              //yes{}
              (
                isCreatingARoom ? (
                  //yes
                  <CreateRoom />
                ) :

                  (isInARoom ? (
                    //yes
                    (
                      <div className="MainGrid">
                        <h2 className="MainGridChatName">{chatName}</h2>
                        <RenderAllMessages />
                        <ProfileSettings />
                      </div>
                    )
                  ) : (
                    <ChatRooms />
                  )
                  )
              )) : (
              <Login />
            )

        }

      </AppContext.Provider>
    );
  } catch (error) {
    console.log(error)
    return (
      <AppContext.Provider value={
        {
          setRenderError,
          setErrorMessage,
          renderError,
          errorMessage
        }}>
        setRenderError(true);
        setErrorMessage("Failed to render main component.");
        <ScreenErrorComponent />
      </AppContext.Provider >)
  }


}

export default App;
