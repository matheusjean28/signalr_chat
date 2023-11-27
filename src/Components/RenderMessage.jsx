import React, { useContext } from "react";
import "../Styles/RenderMessage.css";
import AppContext from "../Context/AppContext";

const RenderMessage = ({ recivedMessages }) => {
  const { username, setUsername } = useContext(AppContext);
  return (
    <ul className="RenderMessageConteiner">
      {recivedMessages.map((message, index) => (
        <li
          className={`RenderMessageLi ${
            username === message.username ? "CurrentUser" : "OtherUser"
          }`}
          key={index}
        >
          <h4>{username ? "You:" : `${message.username}:`}</h4>
          <h5 className="RenderMessageH5">{message.text}</h5>
        </li>
      ))}
    </ul>
  );
};

export default RenderMessage;
