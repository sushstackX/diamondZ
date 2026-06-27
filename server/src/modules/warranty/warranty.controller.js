const service = require("./warranty.service");

class WarrantyController {

  async create(req, res) {
    try {

      const result = await service.createWarranty(
        req.body,
        req.files || []
      );

      return res.status(201).json({
        success: true,
        message: "Warranty registered successfully",
        data: result
      });

    } catch (err) {

      console.error("Create Warranty Error:", err);

      if (err.message.includes("already registered")) {
        return res.status(409).json({
          success: false,
          message: err.message
        });
      }

      if (err.message.includes("Invalid installation date")) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

  async getAll(req, res) {
    try {

      const warranties = await service.getAllWarranties();

      return res.status(200).json({
        success: true,
        data: warranties
      });

    } catch (err) {

      console.error("Get All Warranty Error:", err);

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

  async getById(req, res) {
    try {

      const warranty = await service.getWarrantyById(
        Number(req.params.id)
      );

      if (!warranty) {
        return res.status(404).json({
          success: false,
          message: "Warranty not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: warranty
      });

    } catch (err) {

      console.error("Get Warranty By Id Error:", err);

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

  async getByMobile(req, res) {
    try {

      const warranties = await service.getWarrantyByMobile(
        req.params.mobile
      );

      return res.status(200).json({
        success: true,
        data: warranties
      });

    } catch (err) {

      console.error("Get Warranty By Mobile Error:", err);

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

  async update(req, res) {
    try {

      const warranty = await service.updateWarranty(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Warranty updated successfully",
        data: warranty
      });


    } catch (err) {

      console.error("Update Warranty Error:", err);

      if (err.message.includes("Warranty not found")) {
        return res.status(404).json({
          success: false,
          message: err.message
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

  async delete(req, res) {
    try {

      await service.deleteWarranty(
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Warranty deleted successfully"
      });

    } catch (err) {

      console.error("Delete Warranty Error:", err);

      if (err.message.includes("Warranty not found")) {
        return res.status(404).json({
          success: false,
          message: err.message
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    }
  }

}

module.exports = new WarrantyController();