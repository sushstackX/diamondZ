const warrantyRepository = require("./warranty.repository");
const mailService = require("./mail.service");

class WarrantyService {

  generateWarrantyNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `UNS-${year}-${random}`;
  }

  async createWarranty(body, files = []) {

    try {

      console.log("========== CREATE WARRANTY ==========");
      console.log("STEP 1 - Request received");

      const vehicleRegistration = body.vehicleRegistration
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase();

      console.log("STEP 2 - Vehicle Registration:", vehicleRegistration);

      const existing = await warrantyRepository.findDuplicate(
        body.mobileNumber,
        vehicleRegistration
      );

      if (existing) {
        throw new Error("Warranty already registered for this vehicle");
      }

      console.log("STEP 3 - Duplicate Check Completed");

      const installationDate = new Date(body.installationDate);

      if (isNaN(installationDate.getTime())) {
        throw new Error("Invalid installation date");
      }

      console.log("STEP 4 - Date Valid");

      const warrantyNumber = this.generateWarrantyNumber();

      const warranty = await warrantyRepository.create({
        warrantyNumber,
        customerName: body.customerName,
        mobileNumber: body.mobileNumber,
        email: body.email,
        vehicleBrand: body.vehicleBrand,
        vehicleModel: body.vehicleModel,
        vehicleRegistration,
        productType: body.productType,
        installationDate,
        installerName: body.installerName,
        invoiceNumber: body.invoiceNumber,
        installationArea: body.installationArea,
        remarks: body.remarks
      });

      console.log("STEP 5 - Warranty Saved");

      if (files && files.length > 0) {

        console.log("STEP 6 - Files Received:", files.length);

        await warrantyRepository.createWarrantyFiles(
          warranty.id,
          files
        );

        console.log("STEP 7 - Files Saved");
      }

      const savedWarranty =
        await warrantyRepository.findById(warranty.id);

      console.log("STEP 8 - Warranty Loaded");

      try {

        await mailService.sendWarrantyMail(savedWarranty);

        console.log("STEP 9 - Email Sent");

      } catch (mailError) {

        console.error("MAIL ERROR");
        console.error(mailError);

      }

      console.log("STEP 10 - Returning Response");

      return savedWarranty;

    } catch (err) {

      console.error("SERVICE ERROR");
      console.error(err);

      throw err;
    }
  }

  async getAllWarranties() {
    return warrantyRepository.findAll();
  }

  async getWarrantyById(id) {
    return warrantyRepository.findById(Number(id));
  }

  async getWarrantyByMobile(mobileNumber) {
    return warrantyRepository.findByMobile(mobileNumber);
  }

  async updateWarranty(id, data) {

    const warranty = await warrantyRepository.findById(id);

    if (!warranty) {
      throw new Error("Warranty not found");
    }

    if (data.vehicleRegistration) {
      data.vehicleRegistration = data.vehicleRegistration
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase();
    }

    if (data.installationDate) {

      const installationDate = new Date(data.installationDate);

      if (isNaN(installationDate.getTime())) {
        throw new Error("Invalid installation date");
      }

      data.installationDate = installationDate;
    }

    return warrantyRepository.update(id, data);
  }

  async deleteWarranty(id) {

    const warranty = await warrantyRepository.findById(id);

    if (!warranty) {
      throw new Error("Warranty not found");
    }

    return warrantyRepository.delete(id);
  }
}

module.exports = new WarrantyService();