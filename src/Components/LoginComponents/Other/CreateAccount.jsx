import '../../../Styles/CreateAccount.css'

const CreateAccount = ({ isCreatingAnAcoCunt,
    setIsCreatingAnAcoCunt }) => {
    const isStrongPassword = (password) => {
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLength && hasUppercase && hasLowercase && hasNumber;
    };
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
                    <span>Email</span>
                </label>

                <label>
                    <input class="input" type="password" />
                    <span>Password</span>
                </label>
                <label>
                    <input class="input" type="password" />
                    <span>Confirm password</span>
                </label>
                <button class="submit">Submit</button>
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