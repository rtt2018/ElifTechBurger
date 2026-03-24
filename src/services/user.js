import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const createUser = async ({ email, name, password }) => {
  // console.log('🚀 ~ createUser ~ password:', password);
  // console.log('🚀 ~ createUser ~ name:', name);
  const usrPassword =
    password || crypto.randomBytes(12).toString('base64').slice(0, 12);
  const encryptedPassword = await bcrypt.hash(usrPassword, 10);

  const user = await UsersCollection.findOneAndUpdate(
    { email },
    {
      $setOnInsert: {
        email: email,
        name: name || 'User',
        password: encryptedPassword,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return user;
};
