const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEnquiryEmail = async (data) => {

  const {
    name,
    email,
    company,
    enquiryType,
    message
  } = data;

  await transporter.sendMail({

    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Diamondz PPF Enquiry',

    html: `

      <h2>New Enquiry Received</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Enquiry Type:</b> ${enquiryType}</p>
      <p><b>Message:</b> ${message}</p>

    `
  });
};

module.exports = {
  sendEnquiryEmail
};