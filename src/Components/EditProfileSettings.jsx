
const EditProfileSettings = () => {
    return(
        <>
         <div className="ProfileConteiner">
            <h3>PROFILE SETTINGS</h3>
            <img className='ProfilePicture' src="src/assets/astronaut.svg" alt="astronaut" />
            <h5>{username}</h5>

            <h4>BIO:</h4>
            <h5 className='BioContent'>{userInfo.bio}</h5>

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
                <h5 className='EditProfileH5'>EDIT PROFILE</h5>
                <img className='EditProfileImg' src="src/assets/editar.png" alt="" />
            </button>

        </div>
        </>
    )
}

export default EditProfileSettings;