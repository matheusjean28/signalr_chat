import '../../Styles/ChatConfigtyles.css'
import { ChevronLeft, AtSignIcon, LightbulbIcon, UserPlus } from 'lucide-react'

const ConteinerLeft = ({ chatName }) => {
    return (
        <div className="leftInfoConteiner">
            <span className="chatNameSpan">
                <AtSignIcon size={13} />
                <h2>{chatName}</h2>
            </span>

            <div className="chatDescInfo">
                <h5>CHAT DESCRIPTION</h5>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsa, tempora sequi eius vel, consectetur facilis quis
                    reiciendis temporibus itaque ab nam atque deleniti
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
    )
}

export default ConteinerLeft
