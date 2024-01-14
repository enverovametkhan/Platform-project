const nodemailer = require("nodemailer");

class GoogleEmail {
  constructor() {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "enverov.ametkhan@gmail.com",
        pass: process.env.GOOGLE_KEY,
      },
    });
    this.transporter = transporter;
  }

  async sendEmail(send, content) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2>Email Confirmation</h2>
          <p>Dear User,</p>
          <p>Thank you for signing up. Please click the button below to confirm your email:</p>
          <a href="${content}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
          <p>If you didn't sign up for this service, you can ignore this email.</p>
          <p>Best regards</p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: "enverov.ametkhan@gmail.com",
      to: send,
      subject: "Email Confirmation",
      html: htmlContent,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  }
}

const googleEmailer = new GoogleEmail();

module.exports = {
  googleEmailer,
};
