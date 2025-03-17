import express from 'express';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();

router.get('/', ProductController.getAll);
router.get('/detail/:id', ProductController.getDetail);
router.get('/popular', ProductController.getPopular);

export default router;
