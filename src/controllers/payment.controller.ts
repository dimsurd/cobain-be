import { Request, Response } from 'express';
import { midtrans } from '../services/midtrans.service';
import { PaymentService } from '../services/payment.service'; 
import { OrderStatus } from '@prisma/client';

export class PaymentController {
  static async createOrderAndPayment(req: Request, res: Response) {
    const { name, email, city, postalCode, shippingAddress,totalAmount, items } = req.body;

    const order = await PaymentService.createOrder({
        name,
        email,
        city,
        postalCode,
        shippingAddress,
        items,
      });

    const transactionParams = {
        transaction_details: {
          order_id: order.id,
          gross_amount: totalAmount,
        }, 
      };
  
    const transaction = await midtrans.createTransaction(transactionParams);
     res.json({
        orderId: order.id,
        snapUrl: transaction,
    });
  }
  static async updateOrderStatus(req: Request, res: Response) {
    const { newStatus } = req.body;
    const { orderId } = req.params;

    await PaymentService.updateOrderStatus(Number(orderId), newStatus as OrderStatus);

    res.json({message: 'Order status updated successfully'});
  }
}

