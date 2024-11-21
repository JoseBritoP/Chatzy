import User from "../../models/user.model";
import { AuthSignUp } from "../../schemas/user.schema";
import AppError from "../../utils/appError";
import { hashPassword } from "../../utils/auth";

export const existEmail = async (email: string) => {
  const user = await User.findOne({ email });
  // if (user) throw new Error(`The email is already used`);
  if (user) throw new AppError(`The email is already used`,400);
};

export const signUp = async (data: AuthSignUp) => {
  await existEmail(data.email);

  const newAccount = new User(data);
  newAccount.password = await hashPassword(data.password);

  await newAccount.save();
  return {
    message: "Register successfully!",
    account: {
      _id: newAccount._id,
      email: newAccount.email,
      fullName: newAccount.fullName,
      profilePic: newAccount.profilePic,
    },
  };
};
