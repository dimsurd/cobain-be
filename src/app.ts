import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import productRoutes from './routes/product.routes';
import paymentRoutes from './routes/payment.routes';
import { startRabbitMQConsumer } from './services/rabbitmqConsumer.service';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Run Consumer
startRabbitMQConsumer()

// V1
app.use('/v1/products', productRoutes);
app.use('/v1/payment', paymentRoutes);

export default app;
