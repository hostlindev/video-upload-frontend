import axios from "axios";

// Enlace de desarrollo: http://upload-video-backend.test/
// Enlace de producción: http://upload-video-backend.test/

// http://172.26.9.108/video-upload-backend/public/api/

export const HTTP = axios.create({
  baseURL: "http://upload-video-backend.test/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //withCredentials: true,
});
