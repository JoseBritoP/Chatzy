import User from "../../models/user.model";
import { AuthSignIn } from "../../schemas/user.schema";
import AppError from "../../utils/appError";
import { comparePassword } from "../../utils/auth";

export const signIn = async (data: AuthSignIn) => {
  const user = await User.findOne({ email: data.email });

  // if (!user) throw new Error("Invalid credentials");
  if (!user) throw new AppError("Invalid credentials",400);

  const isPasswordCorrect = await comparePassword(data.password, user.password);
  // if (!isPasswordCorrect) throw new Error(`The password is incorrect`);
  if (!isPasswordCorrect) throw new AppError(`The password is incorrect`,400);
  
  return {
    message: "Login successfully",
    account: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    },
  };
};
