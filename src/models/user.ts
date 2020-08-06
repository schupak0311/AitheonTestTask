import { Document, Schema, Model, model, Error } from "mongoose";

export interface IUser {
  name: string;
  gender: string;
  email: string;
  picture: string;
  password: string;
  removed?: boolean;
}

export interface IUserModel extends Document {
  name: string;
  email: string;
  gender: string;
  picture: string;
  password: string;
  removed: boolean;
  getAllUsers(): Promise<any>;
  deleteById(id: string): Promise<any>;
  updateById(id: string, body: object): Promise<any>;
  createUser(user: IUser): Promise<any>;
  isUserExists(email: string): Promise<any>;
}

export const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.getAllUsers = async function () {
  return this.model("Users")
    .find({
      removed: false,
    })
    .exec();
};

userSchema.methods.createUser = async function (user: IUser) {
  return this.model("Users").create({ ...user, removed: false });
};

userSchema.methods.updateUById = async function (id: string, body: object) {
  return this.model("Users").findById(id, body, { new: true }).exec();
};

userSchema.methods.deleteById = async function (id: string) {
  return this.model("Users").findByIdAndUpdate(id, { removed: true }).exec();
};

userSchema.methods.isUserExists = async function (email: string) {
  return this.model("Users").findOne({ email, removed: false });
};

export const User: Model<IUserModel> = model<IUserModel>("Users", userSchema);
