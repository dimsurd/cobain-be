import prisma from '../models/prisma';

export class ProductService {
  static async getAll() {
    return prisma.product.findMany();
  }
  static async getPopular() {
    return prisma.product.findMany({
      where: { salesCount: { gt: 10 } },
      orderBy: { salesCount: 'desc' },
    });
  }
  static async getDetail(id: string) {
    return prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: {
          select: {
            name: true, 
          },
        },
      },
    });
  }
  
}
