import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      // Create a transporter with your email service credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like 'SendGrid', 'Mailgun', etc.
        auth: {
          user: process.env.EMAIL_USER, // Your email here
          pass: process.env.EMAIL_PASS, // Your password here
        },
      });

      // Email content
      const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Your email to receive the message
        subject: `Contact Form Submission from ${name}`,
        text: message,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to send the email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
