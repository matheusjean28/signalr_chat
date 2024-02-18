import React, { useState, useContext } from "react";
import "../Styles/ProfileSettings.css";

import AppContext from "../Context/AppContext.jsx";
import EditProfileSettings from "./EditProfileSettings.jsx";
import {
  ArrowLeftToLineIcon,
  SquarePen,
  MessageCirclePlus,
  Fingerprint,
  UserRound,
} from "lucide-react";

const ProfileSettings = () => {
  const {
    username,
    setUsername,
    setIsInARoom,
    userInfo,
    setUserInfo,
    isEditing,
    setIsEditing,
    isCreatingARoom,
    setCreatingARoom,
  } = useContext(AppContext);
  return (
    <>
      {!isEditing ? (
        <div className="ProfileConteiner">
          <h5>PROFILE SETTINGS</h5>
          <img
            className="ProfilePicture"
            src="src/assets/astronaut.svg"
            alt="astronaut"
          />
          
          <span className="spanUserName">
            <UserRound color="white" size={15} />
            <h5>{username}</h5>
          </span>

          <span className="spanBio">
            <Fingerprint color="white" className="bioSvg" />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
              tempora sequi eius vel, consectetur facilis quis reiciendis
              temporibus itaque ab nam atque deleniti blanditiis?
            </p>
          </span>

          <button
            className="ProfileBackButton"
            onClick={(e) => {
              e.preventDefault();
              setIsInARoom(false);
              if (isCreatingARoom === true) {
                setCreatingARoom(false);
              }
            }}
          >
            <ArrowLeftToLineIcon color="white" size={15} />
          </button>

          <button
            className="CreateChatButton"
            onClick={(e) => {
              e.preventDefault();
              setCreatingARoom(!isCreatingARoom);
            }}
          >
            Create Chat
            <MessageCirclePlus color="white" size={15} />
          </button>

          <button
            className="EditProfile"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            <h5 className="EditProfileH5">EDIT PROFILE</h5>
            <SquarePen color="white" size={15} />
          </button>
        </div>
      ) : (
        <EditProfileSettings />
      )}
    </>
  );
};
export default ProfileSettings;
