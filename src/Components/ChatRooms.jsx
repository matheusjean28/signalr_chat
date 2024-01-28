import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "../Context/AppContext";
import ProfileSettings from "./ProfileSettings";
import "../Styles/ChatRooms.css";
import { onJoinRoomAsyn }
  from '../ConnectionMethods/OnConnetionCalled';

const ChatRooms = () => {
  const { connection, isInARoom, setIsInARoom, setChatName, userInfo, setCurrentChat, setConnection } =
    useContext(AppContext);
  const [availableRooms, setAvailableRooms] = useState([]);

  //event when user join at room
  connection.on("JoinChat", (message) => {
    console.log("User connected successfully:", message);
  });

  connection.on("ReciveMessage", arg => {
    console.log(arg)
  })
  connection.on("SendMessageToUser", arg => {
    console.log(arg)
  })

  connection.on("UpdateUsersInChatMethod", usersInChat => {
    console.log(usersInChat)
  })

  //try to fetch avaliable romms again until get it
  const reconnectAvaliableRooms = async (connection) => {
    console.log("Trying to reconnect...");
    try {
      await connection.start();
      console.log("Reconnected successfully!");
    } catch (error) {
      console.error("Error reconnecting:", error);
      setTimeout(() => reconnectAvaliableRooms(connection), 1000);
    }
  };

  //fetch avaliable rooms to join
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
        reconnectAvaliableRooms(connection)
      }
    };
    fetchRooms();
  }, [isInARoom]);

  return (
    <div className="ChatRoomConteiner">
      <div className="ChatRoomLeft">
        <h2>JOIN ROOM!</h2>
        <p>Choose a room and join to start a conversation!</p>
        <ul className="ChatListUl">

          {/* //map on each avaliable room to join */}
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
                onClick={async (e) => {
                  e.preventDefault();
                  setChatName(room.chatName);
                  setIsInARoom(true);
                  setCurrentChat(room.chatID)

                  //replace with rigth values and check if ok before send req
                  console.log("user id that calls", userInfo.Id)
                  // onJoinRoomAsyn(userInfo.Id, room.chatID, connection)
                  // connection.invoke("AddToGroup", "teste")
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
