import axios from "axios";
export const instanceRequest = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
})
