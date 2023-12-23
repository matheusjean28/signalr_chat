import React, { useState, useContext } from 'react';
import '../Styles/ProfileSettings.css'
import AppContext from '../Context/AppContext.jsx';

const ProfileSettings = () => {
    const { username, setUsername, setIsInARoom } = useContext(AppContext);
    return (<>
        <div className="ProfileConteiner">
            <h3>PROFILE SETTINGS</h3>
            <img className='ProfilePicture' src="src/assets/astronaut.svg" alt="astronaut" />
            <h5>{username}</h5>

            <h4>BIO:</h4>
            <h5 className='BioContent'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Praesentium necessitatibus, officia, deleniti nesciunt reprehenderit
                architecto perferendis iure quod illum quis exercitationem.
                Animi deleniti libero ut eveniet qui. Ipsam, ratione consectetur.</h5>

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

                <button className='EditProfile'>

                </button>
                
        </div>
    </>)
}
export default ProfileSettings;