import "../../../Styles/Login.css";


const LoginForm = (props) => {
    var { setNameInput,
        setEmailInput,
        setPasswordInput,
        handlerLoginPost,
        setUsername,
        setIsLoged,
        isCreatingAnAcoCunt, 
        setIsCreatingAnAcoCunt } = props;



    return (
        <form className="RigthLoginConteiner" action="#">
            <h1 className="RigthLoginDecoration" >Dive in full bullshit!</h1>
            <h4 className="RigthLoginDecoration" >
                Make sure <br /> you ready!
            </h4>

            <label>
                <input
                    class="input"
                    type="text"
                    name="username"
                    // placeholder="User Name"
                    onChange={(e) => {
                        e.preventDefault();
                        // setUsername(e.target.value.trim());
                        setNameInput(e.target.value)
                    }}
                />
                <span>Username</span>
            </label>
            <label >
                <input
                    class="input"
                    type="email"
                    name="email"

                    onChange={(e) => {
                        e.preventDefault();
                        setEmailInput(e.target.value);
                    }}
                />
                <span>Email</span>
            </label>
            <label >

                <input
                    class="input"
                    type="password"
                    name="passord"

                    onChange={(e) => {
                        e.preventDefault();
                        setPasswordInput(e.target.value);
                    }}
                />
                <span>Password</span>
            </label>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    // handlerLogin();
                    handlerLoginPost()
                }}
            >
                LOGIN
            </button>

            {/* anonim login buton */}
            <button onClick={(e) => {
                e.preventDefault();
                setUsername("<anonim user!>")
                setIsLoged(true);
            }} >Anonim Login</button>

            <div className="create">
                <p>Have no account yet?</p>
                <a href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsCreatingAnAcoCunt(true)
                    }}>Create</a>
            </div>
        </form>
    )
}

export default LoginForm;