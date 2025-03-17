import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const products = await ProductService.getAll();
    res.json(products);
  }
  static async getPopular(req: Request, res: Response) {
    const products = await ProductService.getPopular();
    res.json(products);
  }
  static async getDetail(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductService.getDetail(id);
  
    res.json(product);
  }
}
