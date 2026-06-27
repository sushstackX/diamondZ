const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendWarrantyMail(warranty) {
    let uploadedFilesHtml = "";

    if (warranty.files && warranty.files.length > 0) {
      warranty.files.forEach((file, index) => {
        if (file.resourceType === "image") {
          uploadedFilesHtml += `
            <div style="margin-bottom:20px;">
              <h4>Image ${index + 1}</h4>

              <img
                src="${file.secureUrl}"
                alt="Warranty Image"
                width="350"
                style="
                  border:1px solid #ddd;
                  border-radius:8px;
                  padding:5px;
                "
              />

              <br><br>

              <a href="${file.secureUrl}" target="_blank">
                View Full Image
              </a>

            </div>
          `;
        } else {
          uploadedFilesHtml += `
            <div style="margin-bottom:20px;">
              <h4>Uploaded Video ${index + 1}</h4>

              <a href="${file.secureUrl}" target="_blank">
                Open Video
              </a>

            </div>
          `;
        }
      });
    } else {
      uploadedFilesHtml = `
        <p style="color:red;">
          No files were uploaded.
        </p>
      `;
    }

    const html = `
      <div style="font-family:Arial,sans-serif">

        <h2 style="color:#0B5ED7;">
          New Warranty Registration / Complaint Registration
        </h2>

        <table
          border="1"
          cellpadding="10"
          cellspacing="0"
          style="border-collapse:collapse;width:100%;">

          <tr>
            <td><b>Warranty Number</b></td>
            <td>${warranty.warrantyNumber}</td>
          </tr>

          <tr>
            <td><b>Customer Name</b></td>
            <td>${warranty.customerName}</td>
          </tr>

          <tr>
            <td><b>Mobile Number</b></td>
            <td>${warranty.mobileNumber}</td>
          </tr>

          <tr>
            <td><b>Email</b></td>
            <td>${warranty.email || ""}</td>
          </tr>

          <tr>
            <td><b>Vehicle Brand</b></td>
            <td>${warranty.vehicleBrand}</td>
          </tr>

          <tr>
            <td><b>Vehicle Model</b></td>
            <td>${warranty.vehicleModel}</td>
          </tr>

          <tr>
            <td><b>Registration Number</b></td>
            <td>${warranty.vehicleRegistration}</td>
          </tr>

          <tr>
            <td><b>Product Type</b></td>
            <td>${warranty.productType}</td>
          </tr>

          <tr>
            <td><b>Installation Date</b></td>
            <td>${new Date(warranty.installationDate).toLocaleDateString()}</td>
          </tr>

          <tr>
            <td><b>Installer Name</b></td>
            <td>${warranty.installerName}</td>
          </tr>

          <tr>
            <td><b>Invoice Number</b></td>
            <td>${warranty.invoiceNumber || "-"}</td>
          </tr>

          <tr>
            <td><b>Installation Area</b></td>
            <td>${warranty.installationArea || "-"}</td>
          </tr>

          <tr>
            <td><b>Remarks</b></td>
            <td>${warranty.remarks || "-"}</td>
          </tr>

        </table>

        <br>

        <h2>Uploaded Files</h2>

        ${uploadedFilesHtml}

      </div>
    `;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Warranty Registration - ${warranty.warrantyNumber}`,
      html
    });
  }
}

module.exports = new MailService();