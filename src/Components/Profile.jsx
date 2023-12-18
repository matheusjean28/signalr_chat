import "../Styles/Profile.css";
import AppContext from "../Context/AppContext";
import React, { useContext, useEffect, useState } from "react";

export default function Profile() {
  const { username, setUsername, isInARoom, setIsInARoom } = useContext(AppContext);
  const [user, setUser] = useState("");
  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(user);
  };

  return (
    <>
      <div className="ProfileConteiner">
        <h4>Profile</h4>
        <input
          className="userNameInput"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <button
          className="changeUsernameInput"
          onClick={(e) => {
            handleUsername(e);
          }}
        >
          change
        </button>

        <button
        className="ProfileBackButton"
          onClick={(e) => {
            e.preventDefault()
            setIsInARoom(false)
          }} >{"<-"}</button>
      </div>
    </>
  );
}
