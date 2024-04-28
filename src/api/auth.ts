import axios from "../lib/axios-config";
import {removeCookie, setCookie} from "../lib/utils";

export const Login = async(loginPayload)=>{
    await axios.get('/sanctum/csrf-cookie');
    const {data, status}  = await axios.post("/api/auth/login", loginPayload);
    if(status === 200){
        await removeCookie("auth_token");
        await setCookie({
            name : "auth_token",
            value: `Bearer ${data.data.auth_token}`
        })
    }
    return status === 200;
}

export const Register = async (registerPayload)=> {
    await axios.get('/sanctum/csrf-cookie');
    const {data, status}  = await axios.post("/api/auth/register", registerPayload);
    if(status === 201) {
        await setCookie({
            name: "auth_token",
            value: `Bearer ${data.data.auth_token}`
        });
    }
    return status === 201;
}