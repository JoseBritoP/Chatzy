import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserI extends Document {
  _id: Types.ObjectId;
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  lastConnection?: Date;
}

const UserSchema: Schema<UserI> = new Schema(
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
      minlength: 6,
    },
    profilePic: {
      type: String,
      required: false,
      default: '',
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

// Crear y exportar el modelo tipado
const User = mongoose.model<UserI>('User', UserSchema);

export default User;