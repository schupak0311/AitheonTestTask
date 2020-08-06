import fetch from "node-fetch";
import * as bcrypt from "bcryptjs";

export const fetchRandomUser = async (url: string) => {
  try {
    const response = await fetch(url).then((response) => response.json());
    const { name, gender, email, picture, login } = response.results[0];
    const fullName = name.title + " " + name.first + " " + name.last;

    const salt = await bcrypt.genSalt(Number(login.salt));
    const password = await bcrypt.hash(login.password, salt);

    const randomUser = {
      name: fullName,
      email,
      gender,
      picture: picture.medium,
      password,
    };

    return randomUser;
  } catch (err) {
    throw new Error(err);
  }
};
