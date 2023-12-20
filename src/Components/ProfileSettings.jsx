import React,{useState,useContext} from 'react';
import '../Styles/ProfileSettings.css'
import AppContext from '../Context/AppContext.jsx';

const ProfileSettings = () => {
    const {username, setUsername} = useContext(AppContext);
    return (<>
            <div className="ProfileConteiner">
                <h3>PROFILE SETTINGS</h3>
                <img className='ProfilePicture' src="src/assets/astronaut.svg" alt="astronaut" />
                <h5>{username}</h5>
                <h5>Tips</h5>
            </div>
        </>)
}
export default ProfileSettings;