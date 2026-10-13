import axios from "axios";

const API = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:8080/api",

    withCredentials: true,
});

export default API;

/*1. axios
Imports Axios, used to make HTTP requests from React to the backend.
2. axios.create()
Creates a reusable Axios instance called API.
Avoids writing the backend URL repeatedly.
3. baseURL
baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api"
Sets the base URL for API requests.
VITE_API_URL → gets the deployed backend URL from .env.
|| → if it is not available, uses the local backend URL.
4. withCredentials: true
Allows the browser to send and receive cookies with API requests.
Important in CampusCare because the JWT is stored in an HTTP-only cookie.*/