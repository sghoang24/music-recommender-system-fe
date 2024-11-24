import axios from "axios";

const api = axios.create({
    // baseURL: "https://music-recommender-livid.vercel.app/",
    // // baseURL: "http://localhost:8000/",
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8008/",
})

export default api