import { Types } from "mongoose";
import Message from "../../models/message.model";
import User from "../../models/user.model";
import AppError from "../../utils/appError";

interface GetMessagesProps {
  senderId: Types.ObjectId;
  reciverId: string;
}

export const getMessages = async ({reciverId,senderId}:GetMessagesProps) => {
  // SenderId is the authenticate user
  // ReciverId is the message destinated
  const reciverUser = await User.findById(reciverId).select('-password');

  if(!reciverUser) throw new AppError('Reciver user message not found', 404);

  const messages = await Message.find({
    $or:[
      {
        senderId:senderId,
        reciverId:reciverUser._id
      },
      {
        senderId:reciverUser._id,
        reciverId:senderId
      },
    ]
  });

  return messages;
};
