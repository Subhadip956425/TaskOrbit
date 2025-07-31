import axios from "axios";

export const API_BASE_URL = "https://projectmanagementsystem-latest-bpio.onrender.com";


// export const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5454"
//     : "https://projectmanagementsystem-latest-bpio.onrender.com";

// export const API_BASE_URL = "http://localhost:5454";




// const api = axios.create({ baseURL: API_BASE_URL });

// const jwt = localStorage.getItem("jwt");

// api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
// api.defaults.headers.post["Content-Type"] = "application/json";

// export default api;



const api = axios.create({
  baseURL: API_BASE_URL || "", // update if needed
  withCredentials: true,
});

// Add Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


