import '../Styles/ChatRooms.css'
import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'


const ChatRooms = () => {
    const { isInARoom, setIsInARoom, chatName, setChatName } = useContext(AppContext);
    return (
        <div className="ChatRoomConteiner">
            <div className="ChatRoomLeft">
                <h2>JOIN ROOM!</h2>
                <p>Chose a room and join to get a conversation!</p>
                <ul className="ChatListUl">
                    <li className="ChatListLi">

                        {/* //it render a list with each picprofile from user that are in current chat
//if this list contains more than 3 users, them show a 3+ user's */}
                        <ul className='UlUserInRoom'>
                            {/* make an if here and check if array of users at room is >= 3 */}
                            <li className=' LiUserInRoom'>
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                            </li>
                        </ul>
                        <p>
                            10 Online's
                        </p>
                        <p>Science</p>
                        <button className='ChatListJoinButton' onClick={(e) => {
                            e.preventDefault();
                            setChatName("Science");
                            setIsInARoom(true)
                        }}> JOIN</button>

                    </li>

                    <li className="ChatListLi">

                        {/* //it render a list with each picprofile from user that are in current chat
//if this list contains more than 3 users, them show a 3+ user's */}
                        <ul className='UlUserInRoom'>
                            {/* make an if here and check if array of users at room is >= 3 */}
                            <li className=' LiUserInRoom'>
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                                <img className='ImgUserInRoom' src="src/assets/astronaut.svg" alt="" />
                            </li>
                        </ul>
                        <p>
                            10 Online's
                        </p>
                        <p>Animals</p>
                        <button className='ChatListJoinButton' onClick={(e) => {
                            e.preventDefault();
                            setChatName("Animals");
                            setIsInARoom(true)
                        }}> JOIN</button>

                    </li>

                </ul>
            </div>
            <div className="">
                <p>ok</p>
            </div>
        </div>
    )
}

export default ChatRooms;