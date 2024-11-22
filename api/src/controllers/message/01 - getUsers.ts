import { Types } from "mongoose";
import User from "../../models/user.model";
import AppError from "../../utils/appError";

interface getUsersToChatProps {
  userId: Types.ObjectId;
}

export const getUsersToChat = async ({ userId }: getUsersToChatProps) => {

  const [filteredUsers,countUsers] = await Promise.all([User.find({_id:{$ne:userId}}).select('-password'),User.find({_id:{$ne:userId}}).select('-password').countDocuments()])

  if(!filteredUsers.length) throw new AppError('Not users', 404);

  return {
    count:countUsers,
    users:filteredUsers
  };
};
