import { Types } from "mongoose";
import { existEmail } from "../auth/01 - signUp";
import User from "../../models/user.model";
import cloudinary from "../../config/cloudinary";

interface Props {
  userId: Types.ObjectId;
  userEmail: string;
  data: {
    email?: string;
    fullName?: string;
    profilePic?: string;
  };
}
export const updateProfile = async ({ data, userId, userEmail }: Props) => {
  if (data.email && userEmail !== data.email) {
    await existEmail(data.email);
  }
  if (data.profilePic) {
    const uploadResponse = await cloudinary.uploader.upload(data.profilePic);
    if(!uploadResponse) throw new Error('Error uploading profile picture')
    data.profilePic = uploadResponse.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
    }
  ).select("-password");

  if (!updatedUser) throw new Error("Error updating profile");
  return {
    message: "Profile updated successfully",
    user:updatedUser
  };
};
