import express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();

router.post('/create-order', PaymentController.createOrderAndPayment);
router.post('/order/update-status/:orderId', PaymentController.updateOrderStatus);

export default router;
