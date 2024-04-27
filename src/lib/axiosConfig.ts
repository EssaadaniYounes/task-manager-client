import axios, {AxiosInstance} from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 3000,
    headers: {'Accept': 'application/json', "Content-Type":"application/json"},
} as any) ;

export default instance as AxiosInstance;