import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "../Context/AppContext";
import ProfileSettings from "./ProfileSettings";
import "../Styles/ChatRooms.css";
import reconnect from  '../ConnectionMethods/OnConnetionCalled'

const ChatRooms = () => {
  const { connection, isInARoom, setIsInARoom, setChatName, userInfo, setCurrentChat, setConnection } =
    useContext(AppContext);
  const [availableRooms, setAvailableRooms] = useState([]);

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

        await reconnect(connection);
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
          {availableRooms.map((room) => (
            <li key={room.chatID} className="ChatListLi">
              {console.log(room)}
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

                  setCurrentChat(room.chatID)
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
