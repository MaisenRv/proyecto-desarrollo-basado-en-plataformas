interface UserInterface{
    user_id: BigInteger,
    username: String,
    password: String,
    email: String,
    telefono: String | null,
    created_at: String,
    update_at: String
}

export default UserInterface;

