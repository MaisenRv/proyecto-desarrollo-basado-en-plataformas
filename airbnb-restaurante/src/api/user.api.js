import { fetchWrapper } from "../utils/fetchWrapper.js";
import { ENDPOINTS } from "./endpoints.js";

export const userApi = {
  register: (data) =>
    fetchWrapper(ENDPOINTS.user.create, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (username, password, role) =>
    fetchWrapper(ENDPOINTS.user.login, {
      method: "POST",
      body: JSON.stringify({ username, password, role }),
    }),

  me: () =>
    fetchWrapper(ENDPOINTS.user.me, {
      method: "POST",
      credentials: "include"
    }),
};