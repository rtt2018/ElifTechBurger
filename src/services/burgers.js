import { BurgersCollection } from '../models/burgers.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getBurgersService = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const burgersQuery = BurgersCollection.find();
  const [total, burgers] = await Promise.all([
    BurgersCollection.countDocuments(),
    burgersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .collation({ locale: 'en', strength: 2 })
      .exec(),
  ]);
  const totalPages = Math.ceil(total / perPage);

  return {
    hits: burgers,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    ...(burgers.length === 0 && { message: 'No burgers found' }),
  };
};

export const getBurgersShopService = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  shopName,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const burgersQuery = BurgersCollection.find({ shopName });
  const [total, burgers] = await Promise.all([
    BurgersCollection.countDocuments({ shopName }),
    burgersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const totalPages = Math.ceil(total / perPage);

  return {
    hits: burgers,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    ...(burgers.length === 0 && { message: 'No burgers found' }),
  };
};
