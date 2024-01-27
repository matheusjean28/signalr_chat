import React, { useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "../Context/AppContext";
import ProfileSettings from "./ProfileSettings";
import "../Styles/ChatRooms.css";
import {  reconnect, onJoinRoomAsyn } 
from '../ConnectionMethods/OnConnetionCalled';

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
                  //check if params is ok on the caller function
                  onJoinRoomAsyn()
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
