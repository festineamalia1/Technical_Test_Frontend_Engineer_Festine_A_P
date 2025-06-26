import axios from "axios";

// Set config defaults when creating the instance || Base URL
export const API = "https://frontend-api-mocking-production-de28.up.railway.app/api";
export const BASE_URL = window.location.origin;

// Alter defaults after instance has been created || Integrate default header for auth
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
