import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "../Context/AppContext";
import ProfileSettings from "./ProfileSettings";
import "../Styles/ChatRooms.css";

const ChatRooms = () => {
  const { connection, isInARoom, setIsInARoom, setChatName, userInfo } =
    useContext(AppContext);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5178/GetAllRooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setAvailableRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    fetchRooms();
  }, [isInARoom]);

  useEffect(() => {
    const handleDisconnect = () => {
      console.log("Connection closed");
    };

    const handleReconnecting = (error) => {
      console.log("Reconnecting...", error);
    };

    connection.onclose(handleDisconnect);
    connection.onreconnecting(handleReconnecting);

    return () => {
      connection.off("onclose", handleDisconnect);
      connection.off("onreconnecting", handleReconnecting);
    };
  }, [connection]);

  const onJoinRoom = (room) => {
    console.log("This is the chatId selected", room.chatID);
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.invoke("JoinChat", userInfo.Id, room.chatID).catch((error) => {
        console.error("Error:", error);
      });

      connection.on("ErrorMessage", (errorMessage) => {
        console.error(errorMessage);
      });
    }
  };
 

  return (
    <div className="ChatRoomConteiner">
      <div className="ChatRoomLeft">
        <h2>JOIN ROOM!</h2>
        <p>Choose a room and join to start a conversation!</p>
        <ul className="ChatListUl">
          {availableRooms.map((room) => (
            <li key={room.chatID} className="ChatListLi">
              <ul className="UlUserInRoom">
                {[...Array(Math.min(3, room.onlineUser))].map((_, index) => (
                  <li key={index} className="LiUserInRoom">
                    <img
                      className="ImgUserInRoom"
                      src="src/assets/astronaut.svg"
                      alt=""
                    />
                  </li>
                ))}
              </ul>
              <p>{room.onlineUser} Online</p>
              <p>{room.chatName}</p>
              <button
                className="ChatListJoinButton"
                onClick={(e) => {
                  e.preventDefault();
                  setChatName(room.chatName);
                  onJoinRoom(room);
                  setIsInARoom(true);
                }}
              >
                JOIN
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ProfileSettings />
    </div>
  );
};

export default ChatRooms;
