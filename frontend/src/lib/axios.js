import axios from "axios";

export const axiosInstance= axios.create({
    // baseURL: import.meta.env.MODE==="development"? 'http://localhost:5001/api':"/api",
    baseURL: "https://chatapp-3-1tdz.onrender.com/api",
    withCredentials:true,
})