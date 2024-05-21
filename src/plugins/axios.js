import axios from "axios";

// Enlace de desarrollo: http://upload-video-backend.test/
// Enlace de producción: http://upload-video-backend.test/

export const HTTP = axios.create({
  baseURL: "http://upload-video-backend.test/api/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //withCredentials: true,
});
