import { UserModel } from "../models/user.model";

export class UserService {
  great(user: UserModel) {
    return `Hi, ${user.name}!`;
  }
}
