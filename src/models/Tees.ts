import mongoose, { Schema, Document } from "mongoose";

export interface ITees extends Document {
  title: string;
  drop: string;
  color: string;
  inventory: {
    twoxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
  };
  details: string[];
  price: number;
  reviews: string[];
  imageUrl: string[];
}

const TeesSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    drop: { type: String, required: true },
    color: { type: String, required: true },
    inventory: {
      twoxl: { type: Number, required: true },
      xl: { type: Number, required: true },
      lg: { type: Number, required: true },
      md: { type: Number, required: true },
      sm: { type: Number, required: true },
      xs: { type: Number, required: true },
    },
    details: { type: [String], required: true },
    price: { type: Number, required: true },
    reviews: { type: [String], required: true },
    imageUrl: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITees>("tees", TeesSchema);
