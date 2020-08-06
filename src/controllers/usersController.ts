import { Request, Response, NextFunction } from "express";
import { UsersService, IUserService } from "../services/usersServices";

export interface IUsersController {
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  generateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export class UsersController implements IUsersController {
  private usersService: UsersService = new UsersService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.usersService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).send({ status: 500, message: err.message });
    }
  };

  public generateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newUser = await this.usersService.generateUser();
      if (newUser) res.json({ status: res.status, data: newUser });
      else res.sendStatus(422);
    } catch (err) {
      next(err);
    }
  };

  public updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;

    try {
      const user = await this.usersService.updateUserById(userId, req.body);

      if (user) res.json({ status: res.status, data: user });
      else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  };

  public deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await this.usersService.deleteUserById(userId);
      if (user) res.json({ response: "User deleted Successfully" });
      else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  };

  public authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.usersService.authenticateUser(req.body);
      if (user) res.status(200).send({ status: 200, message: "OK" });
      else res.status(401).json({ status: "error", code: "unauthorized" });
    } catch (err) {
      next(err);
    }
  };
}
