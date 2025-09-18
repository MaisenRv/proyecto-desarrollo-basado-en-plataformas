import UserModel from "../models/User.model.js"
import { UserInterface, UserCreateInterface, UserLoginInterface } from "../interfaces/user.interface.js";
import { MessageInterface } from "../interfaces/message.interface.js";
import env from "../config/env.js";
import jwt from "jsonwebtoken";
import Hash from "../utils/Hash.js";

class UserService {
  private userModel = new UserModel();

  public async getAllUsers(): Promise<UserInterface[]> {
    return await this.userModel.getAllUsers();
  }

  public async register(newUser: UserCreateInterface): Promise<MessageInterface> {
    newUser.password = await Hash.passwordToHash(newUser.password);
    const result = await this.userModel.createUser(newUser);
    const token = jwt.sign(
      { user_id: result.user_id, role: result.role },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    )
    const message: MessageInterface = {
      msg: "Usuario creado exitosamente",
      data: {
        auth_token: token,
        username: result.username
      }
    };
    
    return message;
  }

  public async login(user: UserLoginInterface): Promise<MessageInterface> {
    const result = await this.userModel.findUser(user.username, user.role);
    let message: MessageInterface;
    if (await Hash.comparePassword(user.password, result.password)) {

      const token = jwt.sign(
        { user_id: result.user_id, role: result.role },
        env.JWT_SECRET,
        { expiresIn: "15m" }
      )


      message = {
        msg: "logeado Exitosamente",
        data: {
          auth_token: token,
          username: result.username
        }
      };
    } else {
      message = { msg: "Contraseña incorrecta", data: null };
    }
    return message;
  }

}

export default UserService;

