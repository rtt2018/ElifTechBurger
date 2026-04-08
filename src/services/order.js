import { OrderCollection } from '../models/order.js';
import { Types } from 'mongoose';
import { createUser } from './user.js';

export const createOrder = async ({ userId, cart, totalPrice, address }) => {
  const normalizeCart = cart.map((position) => {
    return {
      burger: Types.ObjectId.createFromHexString(position.burger),
      price: position.price,
      amount: position.amount,
    };
  });

  const newOrder = await OrderCollection.create({
    userId,
    cart: normalizeCart,
    totalPrice,
    address,
    status: 'pending',
    createdAt: new Date(),
  });

  return newOrder;
};

export const getAllOrdersService = async (userId) => {
  const orders = await OrderCollection.find({ userId })
    .populate({
      path: 'cart.burger',
      model: 'burgers',
    })
    .exec();
  return orders;
};

export const addOrderService = async ({ user, cart, totalPrice, address }) => {
  const findUser = await createUser(user);

  const userId = findUser._id || findUser.id;

  const createdOrder = await createOrder({
    cart,
    userId,
    totalPrice,
    address,
  });

  const allOrders = await OrderCollection.find({ userId })
    .populate({
      path: 'cart.burger',
      model: 'burgers',
    })
    .exec();

  return { user, order: createdOrder, orders: allOrders };
};
