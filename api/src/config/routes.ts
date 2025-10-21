const ROUTES = {
    base: "/api",
    users: {
        base: "/users",
        create: "/create",
        login: "/login",
        me: "/me",
        logout: "/logout",
        list: "/"
    },
    restaurants: {
        base: "/restaurants",
        create: "/create",
        update: "/update",
        delete: "/delete",
        list: "/",
        getMeRestaurants: "/meRestaurants",
        getRestaurantById: "/getRestaurantById",
    },
    tables: {
        base: "/table",
        getByRestaurantId: "/meTables",
        getById: "/getTableById",
        create: "/create",
        update: "/update",
        delete: "/delete",
    },
    reservations: {
        base: "/reservation",
        getByRestaurantId: "/getByRestaurantId",
        create: "/create",
    }
};

export default ROUTES;