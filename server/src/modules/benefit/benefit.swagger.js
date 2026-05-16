module.exports = {
  paths: {
    "/api/benefits": {
      get: {
        tags: ["Benefits"],
        summary: "Get all benefits",
        description: "Fetch all active benefits from database",
        responses: {
          200: {
            description: "Benefits fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          title: { type: "string" },
                          icon: { type: "string" },
                          isActive: { type: "boolean" },
                          createdAt: { type: "string", format: "date-time" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      post: {
        tags: ["Benefits"],
        summary: "Create a new benefit",
        description: "Add a new benefit to database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "icon"],
                properties: {
                  title: {
                    type: "string",
                    example: "Long-Term Warranty"
                  },
                  icon: {
                    type: "string",
                    example: "Award"
                  },
                  isActive: {
                    type: "boolean",
                    example: true
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Benefit created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        icon: { type: "string" },
                        isActive: { type: "boolean" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    "/api/benefits/{id}": {
      get: {
        tags: ["Benefits"],
        summary: "Get benefit by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          200: {
            description: "Benefit fetched successfully"
          },
          404: {
            description: "Benefit not found"
          }
        }
      },

      put: {
        tags: ["Benefits"],
        summary: "Update benefit",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  icon: { type: "string" },
                  isActive: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Benefit updated successfully"
          }
        }
      },

      delete: {
        tags: ["Benefits"],
        summary: "Delete benefit",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          200: {
            description: "Benefit deleted successfully"
          }
        }
      }
    }
  }
};