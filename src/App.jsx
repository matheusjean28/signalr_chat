import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/LoginComponents/Login";
import ProfileSettings from "./Components/ProfileSettings";
import "./App.css";
import CreateRoom from "./Components/CreateRoom";

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
  const [isCreatingARoom, setCreatingARoom] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Id: "",
    UserName: username,
    picProfile: "src/assets/editar.png ",
    Gender: "asdf",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  });
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
        newConnection.onclose(async () => {
          console.log("call reconnection cause disconnected");
          await handleReconnection(connection);

        });
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => handleReconnection(), 5000);
      });
  }, [setConnection, isLoged, isInARoom]);

  //called when connection goes wrong
  const handleReconnection = async (connection) => {
    console.log("Trying to reconnect...");
    try {
      await connection.start();
      console.log("Reconnected successfully!");
    } catch (error) {
      console.error("Error reconnecting:", error);
      setTimeout(() => handleReconnection(), 1000);
    }
  };

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {/*
      create an icon to show for user what is your current state connection
      {connection === null ? (
        <h3 className="ConnectionStatus">disconnected</h3>
      ) : (
        <h3 className="ConnectionStatus conected">{`${connection.state}`}</h3>
      )} */}




      {isLoged ? (
        //yes
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
      ) : (
        <Login />
      )}

    </AppContext.Provider>
  );
}

export default App;
