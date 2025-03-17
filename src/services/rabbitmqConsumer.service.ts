import amqplib from 'amqplib';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function startRabbitMQConsumer () {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL as string);
    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: true });

    console.log('✅ [Consumer] Waiting for email notifications...');

    channel.consume(queue, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log(`📨 [Consumer] Processing email for: ${content.email}`);

        await sendEmail(content);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('❌ [Consumer] Error:', error);
  }
}

async function sendEmail(order: { email: string; name: string; orderId: number }) {
  try {
    const response = await axios.post(
        process.env.BREVO_API_URL as string,
      {
        sender: {
            name: process.env.BREVO_SENDER_NAME as string,  
            email: process.env.BREVO_SENDER_EMAIL as string, 
        },
        to: [{ email: order.email, name: order.name }],
        subject: 'Order Confirmation',
        htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2C3E50;">Thank You for Your Order, ${order.name}!</h2>
            <p>We appreciate your purchase and are currently processing your order.</p>
            <p><strong>Order ID:</strong> <span style="color: #3498db;">${order.orderId}</span></p>
            <p>You will receive another email once your order has been shipped.</p>
            <hr style="border: 1px solid #ddd;">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,</p>
            <p><strong>${process.env.BREVO_SENDER_NAME}</strong><br>
            Customer Support Team</p>
            </div>
        `,
      },
      { headers: { 'api-key': process.env.BREVO_API_KEY as string, 'Content-Type': 'application/json' } }
    );

    console.log(`✅ [Consumer] Email sent to ${order.email}:`, response.data);
  } catch (error) {
    console.error('❌ [Consumer] Failed to send email:', (error as any).response?.data || (error as any).message);
  }
  
}

