import mongoose, { Document, Schema, Types } from "mongoose";

export interface User extends Document {
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  lastConnection?: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLenght:6
    },
    profilePic: {
      type: String,
      required: false,
      default:''
    },
    lastConnection: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>('User',UserSchema);

export default User;