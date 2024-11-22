import { Types } from "mongoose";
import Message from "../../models/message.model";
import User from "../../models/user.model";
import AppError from "../../utils/appError";
import cloudinary from "../../config/cloudinary";

interface sendMessageProps {
  reciverId:string
  senderId:Types.ObjectId
  data:{
    text:string,
    image?:string
  }
}

export const sendMessage = async ({data,reciverId,senderId}: sendMessageProps) => {
  const reciverUser = await User.findById(reciverId).select('-password');

  if(!reciverUser) throw new AppError('Reciver user message not found', 404);

  if(data.image){
    const uploadResponse = await cloudinary.uploader.upload(data.image);
    data.image = uploadResponse.secure_url;
  };

  const newMessage = new Message({
    reciverId,
    senderId,
    text:data.text,
    image:data.image
  })

  await newMessage.save();

  // TODO: Socket.io here

  return newMessage
};