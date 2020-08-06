import { User, IUser, IUserModel } from "../models/user";

export interface IUserRepository {
  getAllUsers(): Promise<any>;
  updateUserById(id: string, body: object): Promise<any>;
  deleteUserById(id: string): Promise<any>;
  createUser(user: IUser): Promise<any>;
  isUserExists(email: string): Promise<any>;
}

export class UserRepository implements IUserRepository {
  private UserModel: IUserModel = new User();

  public getAllUsers = async () => {
    return this.UserModel.getAllUsers();
  };

  public createUser = async (user: IUser) => {
    return this.UserModel.createUser(user);
  };

  public updateUserById = async (id: string, body: object) => {
    return this.UserModel.updateById(id, body);
  };

  public deleteUserById = async (id: string) => {
    return this.UserModel.deleteById(id);
  };

  public isUserExists = async (email: string) => {
    return this.UserModel.isUserExists(email);
  };
}

export default UserRepository;
