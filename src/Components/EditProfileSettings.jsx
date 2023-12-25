import React, { useState, useContext } from 'react';
import '../Styles/ProfileSettings.css'
import AppContext from '../Context/AppContext.jsx';
const EditProfileSettings = () => {
    const { username, setUsername, setIsInARoom, userInfo, setUserInfo, setIsEditing  } = useContext(AppContext);

    return (
        <>
            <div className="ProfileConteiner">
                <h3>PROFILE SETTINGS</h3>
                <img className='ProfilePicture' src={userInfo.picProfile} alt="astronaut" />
                <h5>{username}</h5>

                <h4>BIO:</h4>
                <textarea
                onChange={(e) => {
                    e.preventDefault()
                    console.log("chengeed")
                    setUserInfo((prevUserInfo) => ({
                        ...prevUserInfo,
                        bio: e.target.value,
                    }));
                }} 
                className='BioContentInput' value={userInfo.bio} />

                {/* 
            this is for new features
            <div className="ProfileInfos">
            </div> */}
                <button
                    className="ProfileBackButton"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsInARoom(false)
                    }} >{"<-"}</button>

                <button className='EditProfile'
                    onClick={(e) => {
                        e.preventDefault(
                            setIsEditing(false)
                        )
                    }}>
                    <h5 className='EditProfileH5'>save changes</h5>
                    <img className='EditProfileImg' src="src/assets/editar.png" alt="" />
                </button>

            </div>
        </>
    )
}

export default EditProfileSettings;