import { uuid } from 'uuidv4';
import prisma from '../models/prisma';
import { OrderStatus } from "@prisma/client";

export class PaymentService {
  static async getAllOrder() {
    return prisma.order.findMany();
  } 
  static async getOrderById(orderId: number) {
    return prisma.order.findUnique({
        where: { id: orderId },
        select: {
          id: true,
          orderNumber: true,
          totalAmount: true,
          name: true,
          email: true,
        },
      });
  }
  static async createOrder(data: {
    name: string;
    email: string;
    city: string;
    postalCode: string;
    shippingAddress: string;
    items: { id: number; quantity: number; price: number }[];
  }) {
    return prisma.order.create({
        data: {
            orderNumber: `ORDER-${uuid()}`, // Generate orderNumber unik
            name: data.name,
            email: data.email,
            city: data.city,
            postalCode: data.postalCode,
            shippingAddress: data.shippingAddress,
            totalAmount: data.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
            status: 'PENDING',
            items: {
            create: data.items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
            },
        },
        include: {
            items: true,
        },
        });
  }

  static async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
  }
  
}
