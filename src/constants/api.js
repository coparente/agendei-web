import axios from "axios";


const api = axios.create({
    baseURL: "https://api-node-xa3e.onrender.com"
});

export default api;