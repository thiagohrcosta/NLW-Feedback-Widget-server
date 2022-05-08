import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const my_email = process.env.EMAIL;

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "61d786c877b015",
    pass: "92e4dbdebd6d12"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail( { subject, body } : SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: `Thiago Costa <${my_email}>`,
      subject,
      html: body,
    });
  };
}
