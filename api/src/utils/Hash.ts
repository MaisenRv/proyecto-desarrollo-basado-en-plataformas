import bcrypt from "bcrypt";

class Hash{
    private static readonly SALT_ROUNDS = 10; 

    public static async passwordToHash(password: string): Promise<string>{
        return await bcrypt.hash(password,this.SALT_ROUNDS);
    }

    public static async comparePassword(password:string, hashPassword:string): Promise<boolean>{
        return await bcrypt.compare(password, hashPassword);
    }
}

export default Hash