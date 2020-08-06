import { Router } from "express";
import { UsersController } from "../controllers/usersController";

export class ApiRoutes {
  public usersController: UsersController = new UsersController();
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.usersController.getAllUsers);
    this.router.get("/generate", this.usersController.generateUser);
    this.router.delete("/:userId", this.usersController.deleteUserById);
    this.router.put("/:userId", this.usersController.updateUserById);
    this.router.post("/login", this.usersController.authenticateUser);
  }
}
