const contactService = require('./contact.service');

const submitEnquiry = async (req, res) => {

  try {

    console.log("BODY:", req.body);

    await contactService.sendEnquiryEmail(req.body);

    res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully'
    });

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitEnquiry
};