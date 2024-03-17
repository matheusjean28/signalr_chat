import { React, useEffect, useState, signalR } from "./imports";

import "./App.css";
import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/LoginComponents/Login";
import ProfileSettings from "./Components/ProfileSettings";
import CreateRoom from "./Components/CreateRoom";
import ScreenErrorComponent from "./Components/ErrorComponent/ScreenErrorComponent";
import ConnectionStatus from "./Components/ConnectionStatus/ConnectionStatus";
import ErrorPopup from "./Components/ErrorComponent/ErrorPopup";
import ChatConfig from "./Components/ChatConfig/ChatConfig";

//icons
import { Bot, ImageOff } from "lucide-react";
import GlobalConteiner from "./Components/GlobalConteiner/GlobalConteiner";

function App() {
  //make a file to handle this 'consts'
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
  const [stateConnection, setStateConnection] = useState(null);
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

  const [isEditingChat, setIsEditingChat] = useState(false);

  const [renderError, setRenderError] = useState(false);
  const [popMessage, setPopMessage] = useState("");

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
        setPopMessage("Failed to connect to the server.");
        setTimeout(() => handleReconnection(newConnection), 5000);
      });

    return () => {};
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopMessage("");
    }, 9000);
    return () => clearTimeout(timer);
  }, [popMessage]);

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
        setPopMessage("");
      }
    } catch (error) {
      console.error("Error reconnecting:", error);
      setPopMessage(error);
      setRenderError(true);
      setPopMessage("Failed to reconnect.");
      setTimeout(handleReconnection, 1000);
    }
  };

  try {
    return (
      <AppContext.Provider
        value={{
          stateConnection,
          setStateConnection,
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
          popMessage,
          setPopMessage,
        }}
      >
        {popMessage && <ErrorPopup />}
        {isLoged ? <ConnectionStatus /> : ""}
        {renderError ? (
          <ScreenErrorComponent popMessage={popMessage} />
        ) : isLoged ? (
          //yes{}
          isCreatingARoom ? (
            //yes
            <CreateRoom />
          ) : isInARoom ? (
            isEditingChat ? (
              //yes

              <GlobalConteiner
                chatName={chatName}
                currentChat={currentChat}
                setIsEditingChat={setIsEditingChat}
                isEditingChat={isEditingChat}
              />
            ) : (
              <GlobalConteiner
                chatName={chatName}
                currentChat={currentChat}
                setIsEditingChat={setIsEditingChat}
                isEditingChat={isEditingChat}
              />
            )
          ) : (
            <ChatRooms />
          )
        ) : (
          <Login />
        )}
      </AppContext.Provider>
    );
  } catch (error) {
    console.log(error);
    return (
      <AppContext.Provider
        value={{
          setRenderError,
          setPopMessage,
          renderError,
          popMessage,
        }}
      >
        setRenderError(true); setPopMessage("Failed to render main component.");
        <ScreenErrorComponent />
      </AppContext.Provider>
    );
  }
}

export default App;
