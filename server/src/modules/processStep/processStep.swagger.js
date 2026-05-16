module.exports = {
  paths: {
    "/api/process-steps": {
      get: {
        tags: ["Process Steps"],
        summary: "Get all process steps",
        description: "Fetch all active process steps from database",
        responses: {
          200: {
            description: "Process steps fetched successfully",
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
                          description: { type: "string" },
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
        tags: ["Process Steps"],
        summary: "Create new process step",
        description: "Add a new process step to database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "description", "icon"],
                properties: {
                  title: {
                    type: "string",
                    example: "Installation"
                  },
                  description: {
                    type: "string",
                    example: "Professional installation of PPF on vehicle surface"
                  },
                  icon: {
                    type: "string",
                    example: "Shield"
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
            description: "Process step created successfully"
          }
        }
      }
    },

    "/api/process-steps/{id}": {
      get: {
        tags: ["Process Steps"],
        summary: "Get process step by ID",
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
            description: "Process step fetched successfully"
          },
          404: {
            description: "Process step not found"
          }
        }
      },

      put: {
        tags: ["Process Steps"],
        summary: "Update process step",
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
                  description: { type: "string" },
                  icon: { type: "string" },
                  isActive: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Process step updated successfully"
          }
        }
      },

      delete: {
        tags: ["Process Steps"],
        summary: "Delete process step",
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
            description: "Process step deleted successfully"
          }
        }
      }
    }
  }
};