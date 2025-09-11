import {email, z} from "zod"

const UserSchema = z.object({
    username: z.string("Debe ser un string").min(3,"El username debe tener almenos 3 caracteres"),
    password: z.string("Debe ser un string").min(8,"La contraseña debe tener minimo 8 caracteres"),
    email: z.email("Debe ser un email valido"),
    telefono: z.string().nullable(),
})

export default UserSchema;