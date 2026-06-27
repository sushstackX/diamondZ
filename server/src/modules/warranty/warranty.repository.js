const prisma = require("../../config/prisma");

class WarrantyRepository {

  async create(data) {
    return prisma.warrantyRegistration.create({
      data,
      include: {
        files: true
      }
    });
  }

  async createWarrantyFiles(warrantyId, files = []) {

    if (!files.length) {
      return;
    }

    const fileData = files
      .map(file => ({
        warrantyId,
        publicId:
          file.public_id ||
          file.filename ||
          file.originalname,

        secureUrl:
          file.secure_url ||
          file.path ||
          file.url,

        resourceType:
          file.resource_type ||
          (file.mimetype?.startsWith("video/")
            ? "video"
            : "image")
      }))
      .filter(file => file.publicId && file.secureUrl);

    if (!fileData.length) {
      return;
    }

    return prisma.warrantyFile.createMany({
      data: fileData
    });
  }

  async findDuplicate(mobileNumber, vehicleRegistration) {
    return prisma.warrantyRegistration.findFirst({
      where: {
        mobileNumber,
        vehicleRegistration,
        isDeleted: false
      }
    });
  }

  async findAll() {
    return prisma.warrantyRegistration.findMany({
      where: {
        isDeleted: false
      },
      include: {
        files: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id) {
    return prisma.warrantyRegistration.findFirst({
      where: {
        id: Number(id),
        isDeleted: false
      },
      include: {
        files: true
      }
    });
  }

  async findByMobile(mobileNumber) {
    return prisma.warrantyRegistration.findMany({
      where: {
        mobileNumber,
        isDeleted: false
      },
      include: {
        files: true
      }
    });
  }

  async update(id, data) {
    return prisma.warrantyRegistration.update({
      where: {
        id: Number(id)
      },
      data
    });
  }

  async delete(id) {
    return prisma.warrantyRegistration.update({
      where: {
        id: Number(id)
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    });
  }

}

module.exports = new WarrantyRepository();