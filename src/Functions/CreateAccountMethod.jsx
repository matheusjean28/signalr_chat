import axios from "axios";

export default async function CreateAccountMethod(email, password, userName) {
    try {
        if (!email || !password || !userName) {
            throw new Error("All fields are required");
        }
        //replice by .env
        const response = await axios.post('http://localhost:5178/CreateUser', {
            userName: userName,
            email: email,
            pass: password,
            gener: "",
        });

        if (response.status >= 200 && response.status < 300) {
            return {
                data: response.data,
                status: response.status
            };
        } else {
            throw new Error("Fail at create account");
        }
    } catch (error) {
        return {
            error: error.message,
            data: error.response ? error.response.data : null,
            status: error.response ? error.response.status : null
        };
    }
}
