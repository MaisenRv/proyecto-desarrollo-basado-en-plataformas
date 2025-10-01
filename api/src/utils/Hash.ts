import bcrypt from "bcrypt";

class Hash{
    private static readonly SALT_ROUNDS = 10; 
    private static readonly SALT_IMG_ROUNDS = 5;
    public static async passwordToHash(password: string): Promise<string>{
        return await bcrypt.hash(password,this.SALT_ROUNDS);
    }

    public static async comparePassword(password:string, hashPassword:string): Promise<boolean>{
        return await bcrypt.compare(password, hashPassword);
    }

    public static async imgNameToHash(name:string): Promise<String>{
        return await bcrypt.hash(name,this.SALT_IMG_ROUNDS);
    }
}

export default Hash