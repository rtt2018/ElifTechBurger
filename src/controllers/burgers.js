import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  getBurgersService,
  getBurgersShopService,
} from '../services/burgers.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getBurgersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const burgers = await getBurgersService({ page, perPage, sortBy, sortOrder });

  res.status(200).json({
    message: 'Burgers retrieved successfully',
    data: {
      ...burgers,
    },
  });
};

export const getBurgersShopController = async (req, res) => {
  const { shopName } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const burgers = await getBurgersShopService({
    page,
    perPage,
    sortBy,
    sortOrder,
    shopName,
  });

  res.status(200).json({
    message: 'Burgers retrieved successfully',
    data: {
      ...burgers,
    },
  });
};
