import { model, Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    position: {
      type: [
        {
          burger: {
            type: Schema.Types.ObjectId,
            ref: 'burgers',
          },
          price: { type: Number, required: true },
          amount: { type: Number },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

export const CartCollection = model('carts', cartSchema);
