const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Basic way to list items
  let itemList = "";
  for (let i = 0; i < data.items.length; i++) {
    itemList += "- " + data.items[i].name + "\n";
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Laundrolink Order Confirmed",
    text:
      "Hi " +
      data.fullName +
      ",\n\n" +
      "We got your order for:\n" +
      itemList +
      "\n" +
      "Total: ₹" +
      data.totalPrice +
      "\n" +
      "We will call you at " +
      data.phone +
      ".\n\n" +
      "Thank you!",
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
