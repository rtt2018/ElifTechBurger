import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { pingController } from '../controllers/ping.js';
import {
  getBurgersController,
  getBurgersShopController,
} from '../controllers/burgers.js';
import { getCartController, addCartController } from '../controllers/cart.js';
import { addOrderController, getAllUserOrders } from '../controllers/order.js';
import { createOrderShema } from '../validation/order.js';
// import { isValidId } from '../middlewares/isValidId.js';
import { getShopsController } from '../controllers/shops.js';
import {
  loginUserController,
  refreshAuthController,
  sendLoginLinkController,
} from '../controllers/auth.js';

const router = Router();
router.get('/', ctrlWrapper(pingController));
router.get('/burgers/:shopName', ctrlWrapper(getBurgersShopController));
router.get('/burgers', ctrlWrapper(getBurgersController));
router.get('/cart', ctrlWrapper(getCartController));
router.get('/order', ctrlWrapper(getAllUserOrders));
router.get('/shops', ctrlWrapper(getShopsController));
router.get('/login', ctrlWrapper(loginUserController));
router.post('/auth', ctrlWrapper(sendLoginLinkController));
router.post('/refresh', ctrlWrapper(refreshAuthController));

router.post(
  '/order',
  validateBody(createOrderShema),
  ctrlWrapper(addOrderController),
);
router.post('/cart', ctrlWrapper(addCartController));

export default router;
