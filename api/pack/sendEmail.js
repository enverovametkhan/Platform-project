const nodemailer = require("nodemailer");
const { generateTemplate } = require("./template");

const GoogleTemplate = {
  SIGNUP: "SIGNUP",
  RESET_PASSWORD: "RESET_PASSWORD",
  EMAIL_SWAP: "EMAIL_SWAP",
};

class GoogleEmail {
  constructor() {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "enverov.ametkhan@gmail.com",
        pass: process.env.GOOGLE_EMAIL,
      },
    });
    this.transporter = transporter;
  }

  async sendEmail(send, type, payload) {
    const template = await generateTemplate(
      type,
      payload.url,
      payload?.swapEmailData
    );

    const mailOptions = {
      from: "enverov.ametkhan@gmail.com",
      to: send,
      subject: template.subject,
      html: template.html,
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
  GoogleTemplate,
};
