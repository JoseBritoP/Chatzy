import mongoose, { Document, Schema, Types } from "mongoose";

export interface MessageI extends Document {
  senderId: Types.ObjectId;
  reciverId: Types.ObjectId;
  text: string;
  image?: string;
}

const messageSchema: Schema<MessageI> = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    reciverId: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

const Message = mongoose.model<MessageI>("Message", messageSchema);

export default Message;
