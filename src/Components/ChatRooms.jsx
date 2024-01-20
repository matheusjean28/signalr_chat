import * as signalR from "@microsoft/signalr";

import "../Styles/ChatRooms.css";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import ProfileSettings from "./ProfileSettings";

const ChatRooms = () => {
  const {
    connection,
    isInARoom,
    setIsInARoom,
    chatName,
    setChatName,
    currentChat,
    setCurrentChat,
    userInfo,
  } = useContext(AppContext);
  const [avaliableRooms, setAvaliableRooms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5178/GetAllRooms")
      .then((res) => res.json())
      .then((data) => {
        setAvaliableRooms(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [isInARoom]);

  const onJoinRoom = (room) => {
    console.log('this is the chatId selected',room.chatID)
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.invoke("JoinChat", userInfo.Id, currentChat).catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <div className="ChatRoomConteiner">
      <div className="ChatRoomLeft">
        <h2>JOIN ROOM!</h2>
        <p>Chose a room and join to get a conversation!</p>
        <ul className="ChatListUl">
          {avaliableRooms.map((room) => {
            return (
                <li key={room.chatID} className="ChatListLi">
                {/* //it render a list with each picprofile from user that are in current chat
                                    //if this list contains more than 3 users, them show a 3+ user's */}
                <ul className="UlUserInRoom">
                  {/* make an if here and check if array of users at room is >= 3 */}
                  <li className=" LiUserInRoom">
                    <img
                      className="ImgUserInRoom"
                      src="src/assets/astronaut.svg"
                      alt=""
                    />
                    <img
                      className="ImgUserInRoom"
                      src="src/assets/astronaut.svg"
                      alt=""
                    />
                    <img
                      className="ImgUserInRoom"
                      src="src/assets/astronaut.svg"
                      alt=""
                    />
                  </li>
                </ul>
                <p>{room.onlineUser} Online's</p>
                <p>{room.chatName}</p>
                <button
                  className="ChatListJoinButton"
                  onClick={(e) => {
                      e.preventDefault();
                      setCurrentChat(room.chatID);
                      setChatName(room.chatName);
                      onJoinRoom(room);
                      setIsInARoom(true);
                  }}
                >
                  JOIN
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <ProfileSettings />
    </div>
  );
};

export default ChatRooms;
