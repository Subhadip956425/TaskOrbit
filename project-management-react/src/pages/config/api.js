import axios from "axios";

// export const API_BASE_URL = "https://projectmanagementsystem-latest-bpio.onrender.com";

// export const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5454"
//     : "https://projectmanagementsystem-latest-bpio.onrender.com";

export const API_BASE_URL = "http://localhost:5454";
const api = axios.create({ baseURL: API_BASE_URL });

const jwt = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
