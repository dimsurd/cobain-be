import amqplib from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmailNotification(order: any) {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL as string);
    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({
      email: order.email,
      name: order.name,
      orderId: order.id,
    });

    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log(`📩 [Publisher] Email notification sent to queue: ${order.email}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('❌ [Publisher] Error sending email notification:', error);
  }
}
