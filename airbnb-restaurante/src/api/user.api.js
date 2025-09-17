import { fetchWrapper } from "../utils/fetchWrapper.js";

const API_URL = "http://localhost:3000/api/users";

export const userApi = {
  register: (data) =>
    fetchWrapper(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (email, password) =>
    fetchWrapper(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () =>
    fetchWrapper(`${API_URL}/me`, {
      method: "GET",
    }),
};