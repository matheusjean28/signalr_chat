import AppContext from '../../../Context/AppContext';
import '../../../Styles/CreateAccount.css'
import CreateAccountMethod from '../../../Functions/CreateAccountMethod';

import { useContext, useState } from 'react';

const CreateAccount = ({ isCreatingAnAcoCunt, setIsCreatingAnAcoCunt, }) => {
    const { setErrorMessage, userInfo,setUserInfo,setIsLoged } = useContext(AppContext);

    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [confirmePass, setConfirmePass] = useState("");
    const [validEmail, setValidEmail] = useState("");

    const isStrongPassword = (password) => {
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLength && hasUppercase && hasLowercase && hasNumber;
    };

    const isAValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const checkDublePass = (pass, confirmePass) => {
        console.log(pass, confirmePass);
        if (pass.trim() === confirmePass.trim()) {
            if (!isStrongPassword(confirmePass)) {
                setErrorMessage("invalidPassWord");
                return false;
            }
        } else {
            setErrorMessage("Different pass");
            return false;
        }
        return true;
    };

    const sendCreateAcountMethod = async () => {
        if (!isAValidEmail(validEmail)) {
            setErrorMessage('invalid Email');
            return;
        }else {
            setEmail(validEmail)
        }

        if (!checkDublePass(pass, confirmePass)) {
            return;
        }else {
            setPassword(confirmePass)
        }

        const trimmLastName = lastName.trim();
        const trimmFirstName = firstName.trim();
        if (trimmFirstName.concat(trimmLastName).length >= 8) {
            setUserName(trimmFirstName.concat(trimmLastName));
        } else {
            setErrorMessage('Invalid Username');
            return;
        } 

        console.log(email, password, userName)
        const _argCreate = await CreateAccountMethod(email, password, userName)
        console.log("data at create: ",_argCreate )
        setUserInfo(_argCreate.data)
        localStorage.setItem('token', await _argCreate.data.token.token )
        setIsLoged(true);
    }


    return (
        <div className="ConteinerRigth">

            <form class="form">
                <p class="title">Create An Account </p>
                <p class="message">Signup now and get full access to our app. </p>
                <div class="flex">
                    <label>
                        <input onChange={(e) => {
                            e.preventDefault()
                            setFistName(e.target.value)
                        }} class="input" type="text" />
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input onChange={(e) => {
                            e.preventDefault()
                            setLastName(e.target.value)
                        }} class="input" type="text" />
                        <span>Lastname</span>
                    </label>
                </div>

                <label>
                    <input onChange={(e) => {
                        e.preventDefault()
                        setValidEmail(e.target.value)
                    }} class="input" type="email" />
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
                    sendCreateAcountMethod()
                }}>Create</button>
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