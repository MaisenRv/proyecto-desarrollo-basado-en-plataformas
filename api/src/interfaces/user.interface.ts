export interface UserInterface{
    user_id: BigInteger,
    username: string,
    password: string,
    email: string,
    telefono: string | null,
    role:string | null
    created_at: string,
    update_at: string
}
export interface UserCreateInterface{
    username: string,
    password: string,
    email: string,
    telefono: string | null,
    role: string
}
export interface UserLoginInterface{
    username: string,
    password: string,
    role: string,
}



