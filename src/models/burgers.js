import { Schema, model } from 'mongoose';

const burgersShema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    shopName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BurgersCollection = model('burgers', burgersShema);
