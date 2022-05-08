import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const my_email = process.env.EMAIL;

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "61d786c877b015",
    pass: "92e4dbdebd6d12"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: `Thiago Costa <${my_email}>`,
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px, color: #111">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
  console.log("HTTP server running!");
})
