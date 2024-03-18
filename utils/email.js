const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text'); // transforms the html to a text
const Transport = require('nodemailer-brevo-transport');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Jonas <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: process.env.BREVO_EMAIL,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    }
    // return nodemailer.createTransport({
    //   //everything here is received from nodemailer.
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
    return nodemailer.createTransport(
      new Transport({
        apiKey:
          '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',
      }),
    );
  }

  async send(template, subject) {
    // 1) render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport to send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', `Welcome to Natours ${this.firstName}!`);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      `Your Password Reset Link (Valid for 10 Minutes)`,
    );
  }
};
