import { UserRepository, IUserRepository } from "../repository/userRepository";
import * as bcrypt from "bcryptjs";
import { fetchRandomUser } from "../util/fetchUser";

const RANDOM_USER_API = "https://randomuser.me/api/";

export interface IUserService {
  generateUser(): Promise<any>;
  getAllUsers(): Promise<any>;
  updateUserById(id: string, data: object): Promise<any>;
  deleteUserById(id: string): Promise<any>;
  authenticateUser(userData: any): Promise<any>;
}

export class UsersService implements IUserService {
  private usersRepository: IUserRepository = new UserRepository();

  public generateUser = async (): Promise<any> => {
    try {
      const user = await fetchRandomUser(RANDOM_USER_API);
      await this.usersRepository.createUser(user);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  };

  public getAllUsers = async (): Promise<any> => {
    try {
      const users = await this.usersRepository.getAllUsers();
      return users;
    } catch (err) {
      throw new Error(err);
    }
  };

  public updateUserById = async (id: string, data: Object): Promise<any> => {
    try {
      const user = await this.usersRepository.updateUserById(id, data);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  };

  public deleteUserById = async (id: string): Promise<any> => {
    try {
      const user = await this.usersRepository.deleteUserById(id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  };

  public authenticateUser = async (userData: any): Promise<any> => {
    const { email, password } = userData;
    try {
      const user = await this.usersRepository.isUserExists(email);
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error("Password doesn't match");
      }

      return user;
    } catch (err) {
      throw new Error(err);
    }
  };
}
