import "../../../Styles/Login.css";


const LoginForm = (props) => {
    var {setNameInput,
        setEmailInput,
        setPasswordInput,
        handlerLoginPost,
        setUsername,
        setIsLoged,} = props;
    
    return (
        <form className="RigthLoginConteiner" action="#">
            <h1>Dive in full bullshit!</h1>
            <h4>
                Make sure <br /> you ready!
            </h4>

            <input
                type="text"
                name="username"
                placeholder="User Name"
                onChange={(e) => {
                    e.preventDefault();
                    // setUsername(e.target.value.trim());
                    setNameInput(e.target.value)
                }}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                    e.preventDefault();
                    setEmailInput(e.target.value);
                }}
            />
            <input
                type="password"
                name="passord"
                placeholder="Passord"
                onChange={(e) => {
                    e.preventDefault();
                    setPasswordInput(e.target.value);
                }}
            />
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
        </form>
    )
}

export default LoginForm;