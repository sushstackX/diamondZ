module.exports = {
  paths: {
    "/api/faqs": {
      get: {
        tags: ["FAQ"],
        summary: "Get all FAQs",
        description: "Fetch all active FAQs from database",
        responses: {
          200: {
            description: "FAQs fetched successfully",
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
                          question: { type: "string" },
                          answer: { type: "string" },
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
        tags: ["FAQ"],
        summary: "Create new FAQ",
        description: "Add a new FAQ to database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["question", "answer"],
                properties: {
                  question: {
                    type: "string",
                    example: "What is PPF?"
                  },
                  answer: {
                    type: "string",
                    example: "PPF is Paint Protection Film used to protect car paint."
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
            description: "FAQ created successfully"
          }
        }
      }
    },

    "/api/faqs/{id}": {
      get: {
        tags: ["FAQ"],
        summary: "Get FAQ by ID",
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
            description: "FAQ fetched successfully"
          },
          404: {
            description: "FAQ not found"
          }
        }
      },

      put: {
        tags: ["FAQ"],
        summary: "Update FAQ",
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
                  question: { type: "string" },
                  answer: { type: "string" },
                  isActive: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "FAQ updated successfully"
          }
        }
      },

      delete: {
        tags: ["FAQ"],
        summary: "Delete FAQ",
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
            description: "FAQ deleted successfully"
          }
        }
      }
    }
  }
};