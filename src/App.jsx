import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/Login";
import ProfileSettings from "./Components/ProfileSettings";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
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
  const [userInfo, setUserInfo] = useState({
    Id: "",
    UserName: username,
    picProfile: "src/assets/editar.png ",
    Gender: "asdf",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  });

  //set the first connection and change
  //only when setConnection, isLoged, isInARoom, userInfo.userId, currentChat are changed
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Conectado ao hub!");
      })
      .catch((error) => {
        console.error("Erro ao conectar ao hub:", error);
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [setConnection, isLoged, isInARoom, userInfo.userId, currentChat]);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {isLoged ? (
        isInARoom ? (
          <div className="MainGrid">
            <h2 className="MainGridChatName">{chatName}</h2>
            <RenderAllMessages />
            <ProfileSettings />
          </div>
        ) : (
          <ChatRooms />
        )
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

export default App;
