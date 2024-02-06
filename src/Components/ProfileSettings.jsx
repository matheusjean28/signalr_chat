import React, { useState, useContext } from 'react';
import '../Styles/ProfileSettings.css'

import AppContext from '../Context/AppContext.jsx';
import EditProfileSettings from './EditProfileSettings.jsx';

const ProfileSettings = () => {
    const { username, setUsername, setIsInARoom, userInfo, setUserInfo, isEditing, setIsEditing, isCreatingARoom, setCreatingARoom } = useContext(AppContext);
    return (<>
        {!isEditing ? <div className="ProfileConteiner">
            <h3>PROFILE SETTINGS</h3>
            <img className='ProfilePicture' src="src/assets/astronaut.svg" alt="astronaut" />
            <h5>{username}</h5>

            <h4 className='ProfileConteinerH4Bio' >BIO:</h4>
            <h5 className='BioContent'>userinfo</h5>

            {/* 
            this is for new features
            <div className="ProfileInfos">
            </div> */}
            <button
                className="ProfileBackButton"
                onClick={(e) => {
                    e.preventDefault()
                    setIsInARoom(false)
                    if (isCreatingARoom === true) {
                        setCreatingARoom(false)
                     }
                }} >{"<-"}</button>


            <button onClick={(e) => {
                e.preventDefault();
                setCreatingARoom(!isCreatingARoom);
            }}>
                Create
            </button>

            <button className='EditProfile'
                onClick={(e) => {
                    e.preventDefault()
                    setIsEditing(true);
                }}
            >

                <h5 className='EditProfileH5'>EDIT PROFILE</h5>
                <img className='EditProfileImg' src="src/assets/editar.png" alt="" />
            </button>

        </div> : <EditProfileSettings />}
    </>)
}
export default ProfileSettings;