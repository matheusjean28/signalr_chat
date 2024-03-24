import '../../Styles/ChatConfigtyles.css'
import { ChevronLeft, AtSignIcon, LightbulbIcon } from 'lucide-react'

const ChatConfig = ({
    currentChat,
    setIsEditingChat,
    isEditingChat,
    chatInformation,
    setChatInformation,
}) => {
    const { chatName } = chatInformation
    console.log(chatInformation)
    return (
        <div className="ChatConfigConteiner">
            {/* header button */}
            <div className="leftInfoConteiner">
                <span className="chatNameSpan">
                    <AtSignIcon size={13} />
                    <h2>{chatName}</h2>
                </span>

                <div className="chatDescInfo">
                    <h5>CHAT DESCRIPTION</h5>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ipsa, tempora sequi eius vel, consectetur facilis
                        quis reiciendis temporibus itaque ab nam atque deleniti
                        blanditiis?
                    </p>

                    <div className="chatCategInfo">
                        <h5>Category's</h5>

                        <ul className="ulChatCateg">
                            <li className="liChatCateg">
                                <p>Story</p>
                                <LightbulbIcon size={12} />
                            </li>

                            <li className="liChatCateg">
                                <p>Magical</p>
                                <LightbulbIcon size={12} />
                            </li>

                            <li className="liChatCateg">
                                <p>Random </p>
                                <LightbulbIcon size={12} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* card info about manager */}
            <div className="infoConteiner">
                <h4>Manegers:</h4>
                <ul className="ulInfoManegers ">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li className="liInfoManagers">
                            <p className="infoContent" key={index}>
                                {}
                            </p>
                            <p className="infoContent managersName">Matth</p>
                            <p className="infoContent cargo">manager</p>
                        </li>
                    ))}
                </ul>
                <h4 className="currentUsersCards">Current Users:</h4>
                <ul className="ulInfoManegers ">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li className="liInfoManagers">
                            <p className="infoContent" key={index}></p>
                            <p className="infoContent managersName">Matth</p>
                            <p className="infoContent cargo">manager</p>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="handleCloseBtn"
                onClick={(e) => {
                    e.preventDefault()
                    setIsEditingChat(!isEditingChat)
                }}
            >
                <span>
                    <ChevronLeft size={20} />
                </span>
                <h2>Back</h2>
            </button>
        </div>
    )
}

export default ChatConfig
