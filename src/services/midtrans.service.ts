import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

export const midtrans = new midtransClient.Snap({
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
  isProduction: false
});
