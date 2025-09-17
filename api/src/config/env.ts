const env = {
    "PORT": 4000,
    "CORS_CONFIG":{},
    "DATABASE":{
        "USER":"admin",
        "HOST":"172.20.0.4",
        "DB_NAME":"air_restaurants",
        "PASSWORD":"root",
        "PORT":parseInt("5432")
    },
    "JWT_SECRET":"8a8126d6bcf266bbfb078388c5f05db649dead25856d4ba61afc347035a3e945"
};

export default env;
