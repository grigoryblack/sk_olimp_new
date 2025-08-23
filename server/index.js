import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.YANDEX_EMAIL,
    pass: process.env.YANDEX_APP_PASSWORD,
  },
});

// API endpoint to send email
app.post('/api/send-email', async (req, res) => {
  const { name, phone, question } = req.body;

  if (!name || !phone || !question) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения.' });
  }

  const mailOptions = {
    from: process.env.YANDEX_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Новое сообщение с формы обратной связи',
    text: `
      Имя: ${name}
      Телефон: ${phone}
      Вопрос: ${question}
    `,
    html: `
      <h3>Новое сообщение с формы обратной связи</h3>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Вопрос:</strong> ${question}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Ошибка при отправке email.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});