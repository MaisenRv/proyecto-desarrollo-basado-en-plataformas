import { fetchWrapper } from "../utils/fetchWrapper.js";
import { ENDPOINTS } from "./endpoints.js";

export const userApi = {
  register: (username, password, email, role) =>
    fetchWrapper(ENDPOINTS.user.create, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        role: role,
        telefono: null
      }),
    }),

  login: (username, password, role) =>
    fetchWrapper(ENDPOINTS.user.login, {
      method: "POST",
      body: JSON.stringify({ username, password, role }),
    }),

  me: () =>
    fetchWrapper(ENDPOINTS.user.me, {
      method: "GET",
      credentials: "include"
    }),

  logout: () =>
    fetchWrapper(ENDPOINTS.user.logout, {
      method: "POST",
      credentials: "include"
    })
};