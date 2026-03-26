import { UsersCollection } from '../models/user.js';

export const createUser = async ({ email, name, phone }) => {
  const user = await UsersCollection.findOneAndUpdate(
    { email },
    {
      $setOnInsert: {
        email: email,
        name: name || 'User',
        phone: phone || '+38000000000',
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return user;
};

export const findUser = async ({ email, phone }) => {
  const user = await UsersCollection.findOne({ email, phone });
  return user;
};
