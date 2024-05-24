import { HTTP } from "./axios";

const TOKEN_KEY = "video_upload";

export const getToken = () =>
  JSON.parse(window.sessionStorage.getItem(TOKEN_KEY));

export const saveToken = (token) => {
  setAuthorizationHeader(token.access_token);
  saveToSessionStorage(TOKEN_KEY, token);
};

export const destroyToken = () => {
  removeAuthorizationHeader();
  removeFromSessionStorage(TOKEN_KEY);
};

const setAuthorizationHeader = (token) => {
  HTTP.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete HTTP.defaults.headers.common.Authorization;
};

const saveToSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

const removeFromSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};

const Auth = {
  getToken,
  saveToken,
  destroyToken,
};

export default Auth;
