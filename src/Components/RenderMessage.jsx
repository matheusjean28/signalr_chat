import React, { useContext } from "react";
import "../Styles/RenderMessage.css";
import AppContext from "../Context/AppContext";

const RenderMessage = ({ recivedMessages }) => {
  const { username, setUsername } = useContext(AppContext);
  return (
    <ul className="RenderMessageConteiner">
      {recivedMessages.map((message, index) => (
        <li
          className={ username === message.username ? "CurrentUser" : "OtherUser"}
          key={index}
        >
          <h4>
            {username === message.username ? "You:" : `${message.username}:`}
          </h4>
          <h5 className="RenderMessageH5">{message.text}</h5>
        </li>
      ))}
      <li className="CurrentUser">
        <h4>teste</h4>
      </li>
      <li className="OtherUser">
        <h4>teste</h4>
      </li>
    </ul>
  );
};

export default RenderMessage;
