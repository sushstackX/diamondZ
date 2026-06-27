const contactService = require('./contact.service');

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // allow digits, spaces, dashes, parentheses and leading +; require at least 7 digits
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 7) return false;
  const re = /^[0-9+()\s-]+$/;
  return re.test(phone);
};

const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      enquiryType,
      message
    } = req.body || {};

    const missing = [];
    if (!name) missing.push('name');
    if (!email) missing.push('email');
    if (!phone) missing.push('phone');
    if (!company) missing.push('company');
    if (!enquiryType) missing.push('enquiryType');
    if (!message) missing.push('message');

    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: ' + missing.join(', ')
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    console.log('BODY:', req.body);

    await contactService.sendEnquiryEmail(req.body);

    res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully'
    });
  } catch (error) {
    console.log('EMAIL ERROR:');
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