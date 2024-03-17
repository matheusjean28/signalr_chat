import RenderAllMessages from "../RenderAllMessages";
import ProfileSettings from "../ProfileSettings";
import ChatConfig from "../ChatConfig/ChatConfig";

//icons
import { Bot, ImageOff } from "lucide-react";

//display profile at right side and other component on left

//styles
import "../../App.css";
import React from "react";

const GlobalConteiner = ({
  chatName,
  currentChat,
  setIsEditingChat,
  isEditingChat,
}) => {
  return isEditingChat ? (
    <div className="MainGrid">
      <ChatConfig
        className="MainGridChatName"
        currentChat={currentChat}
        setIsEditingChat={setIsEditingChat}
        isEditingChat={isEditingChat}
      />

      <ProfileSettings />
    </div>
  ) : (
    <div className="MainGrid">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsEditingChat(!isEditingChat);
        }}
        className="MainGridChatName"
      >
        <h2>{chatName}</h2>
        <span>
          <Bot size={20} />
        </span>
      </button>
      <RenderAllMessages />
      <ProfileSettings />
    </div>
  );
  //     <span>
  //     <Bot size={20} />
  //   </span>
};

export default GlobalConteiner;
