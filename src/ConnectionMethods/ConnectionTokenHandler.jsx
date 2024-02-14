
const ConnectionTokenHandler  =  (action, token = "") => {
    const saveToken = (token) => {
        return  localStorage.setItem('token', token);
    };

    const getToken = () => {
        var data = localStorage.getItem('token');
        console.log(data)
        return data
    };

    const removeToken = () => {
        return localStorage.removeItem('token');
    };

    if (token.length != null) {
        switch (action) {
            case "saveToken":
                localStorage.setItem('token', token);
                break;
            case "getToken":
                console.log("get")
                localStorage.getItem("token")
                break;

            case "removeToken":
                localStorage.removeItem('token');
                break;
            default:
                break;
        }

    }



}
export default ConnectionTokenHandler;