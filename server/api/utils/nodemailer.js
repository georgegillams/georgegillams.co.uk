import nodemailer from 'nodemailer';

let mailConfig = null;
let transporter = null;
if (process.env.GSUITE_EMAIL && process.env.GSUITE_APP_PASSWORD) {
  mailConfig = {
    service: 'gmail',
    auth: {
      user: process.env.GSUITE_EMAIL,
      pass: process.env.GSUITE_APP_PASSWORD,
    },
  };
  transporter = nodemailer.createTransport(mailConfig);
} else {
  transporter = {};
  transporter.sendMail = obj => {
    // eslint-disable-next-line no-console
    console.log(obj);
  };
}

module.exports = transporter;
