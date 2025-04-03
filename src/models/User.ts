import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  dateofbirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  points: number;
  orders: mongoose.Types.ObjectId[]; // Array of order references
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    dateofbirth: { type: String, required: true },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zip: { type: String, required: false },
    },
    points: { type: Number, default: 0 },
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }], // Array of order references
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
