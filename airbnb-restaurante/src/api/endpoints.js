const API_BASE = "http://localhost:4000/api";

export const ENDPOINTS = {
    user:{
        login: `${API_BASE}/users/login`,
        create: `${API_BASE}/users/create`,
        me: `${API_BASE}/users/me`,
        logout: `${API_BASE}/users/logout`,
    },
    restaurant:{
        list: `${API_BASE}/restaurants`,
        create: `${API_BASE}/restaurants/create`,
        getById: `${API_BASE}/restaurants/meRestaurants`,
    }
}