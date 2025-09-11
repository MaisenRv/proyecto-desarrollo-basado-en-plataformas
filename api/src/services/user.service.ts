import UserModel from "../models/User.model.js"
import {UserInterface} from "../interfaces/user.interface.js";
import { MessageInterface } from "../interfaces/message.interface.js";

class UserService{
  private userModel = new UserModel();

  public async getAllUsers(): Promise<UserInterface[]> {
    return this.userModel.getAllUsers();
  }

  // public async register(newUser:UserInterface): Promise<MessageInterface>{
    // return this.userModel.
  // }

}

export default UserService;

