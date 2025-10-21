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
        getMeRestaurants: `${API_BASE}/restaurants/meRestaurants`,
        delete: `${API_BASE}/restaurants/delete`,
        getOne: `${API_BASE}/restaurants/getRestaurantById`,
        update: `${API_BASE}/restaurants/update`
    },
    table:{
        getMeTables: `${API_BASE}/table/meTables`,
        getTableById: `${API_BASE}/table/getTableById`,
        create: `${API_BASE}/table/create`,
        update: `${API_BASE}/table/update`,
        delete: `${API_BASE}/table/delete`
    },
    reservation:{
        getByRestaurantId: `${API_BASE}/reservation/getByRestaurantId`,
        create: `${API_BASE}/reservation/create`,
    }
}