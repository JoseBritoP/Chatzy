import User from "../../models/user.model";
import { AuthSignIn } from "../../schemas/user.schema";
import { comparePassword } from "../../utils/auth";

export const signIn = async (data: AuthSignIn) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new Error("Credentials invalid");

  const isPasswordCorrect = await comparePassword(data.password, user.password);
  if (!isPasswordCorrect) throw new Error(`The password is incorrect`);
  
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
