import '../../../Styles/CreateAccount.css'

import { useState } from 'react';

const CreateAccount = ({ isCreatingAnAcoCunt,
    setIsCreatingAnAcoCunt }) => {
    // error message to display
    const [errorMessage, setErrorMessage] = useState("");
    const showError = (errorMessage) => {
        setErrorMessage(errorMessage);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    }


    const [firstName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const [pass, setPass] = useState("")
    const [confirmePass, setConfirmePass] = useState("")

    const isStrongPassword = (password) => {
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLength && hasUppercase && hasLowercase && hasNumber;
    };


    // a double check for fields and before set pass with ok to send to create 
    const checkDublePass = (pass, confirmePass) => {
        if (pass.trim() === confirmePass.trim()) {
            if (isStrongPassword(confirmePass)) {
                setPassword(confirmePass)
            } return console.error("invalid pass")

        } return console.error("diferent pass")
    }

    return (
        <div className="ConteinerRigth">

            <form class="form">
                <p class="title">Create An Account </p>
                <p class="message">Signup now and get full access to our app. </p>
                <div class="flex">
                    <label>
                        <input class="input" type="text" />
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input class="input" type="text" />
                        <span>Lastname</span>
                    </label>
                </div>

                <label>
                    <input class="input" type="email" />
                    <span >Email</span>
                </label>

                <label>
                    <input class="input" type="password" onChange={(e) => {
                        e.preventDefault()
                        setPass(e.target.value)
                    }} />
                    <span>Password</span>
                </label>
                <label>
                    <input class="input" type="password" onChange={(e) => {
                        e.preventDefault()
                        setConfirmePass(e.target.value)
                    }} />
                    <span>Confirm password</span>
                </label>
                <button class="submit" onClick={(e) => {
                    e.preventDefault()
                    checkDublePass(pass, confirmePass)
                }}>Submit</button>
                <p class="signin">Already have an acount ? <a onClick={(e) => {
                    e.preventDefault(
                        setIsCreatingAnAcoCunt(false)
                        
                    )
                }} href="#">Signin</a> </p>
            </form>
        </div>
    )
}

export default CreateAccount;