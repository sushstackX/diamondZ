module.exports = {
  paths: {
    "/api/ppf-pages": {
      get: {
        tags: ["PPF Types"],
        summary: "Get all PPF pages",
        description: "Fetch all PPF pages from the database",
        responses: {
          200: {
            description: "PPF pages fetched successfully",
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
                          slug: { type: "string" },
                          description: { type: "string" },
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
        tags: ["PPF Types"],
        summary: "Create a new PPF page",
        description: "Add a new PPF page to the database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "slug"],
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  description: { type: "string" },
                  isActive: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "PPF page created successfully"
          }
        }
      }
    },
    "/api/ppf-pages/bulk": {
      post: {
        tags: ["PPF Types"],
        summary: "Create multiple PPF pages",
        description: "Add many PPF pages in a single request",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  required: ["title", "slug"],
                  properties: {
                    title: { type: "string" },
                    slug: { type: "string" },
                    description: { type: "string" },
                    isActive: { type: "boolean" }
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "PPF pages created successfully"
          }
        }
      }
    },
    "/api/ppf-pages/{slug}": {
      get: {
        tags: ["PPF Types"],
        summary: "Get a PPF page by slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "PPF page fetched successfully"
          },
          404: {
            description: "PPF page not found"
          }
        }
      }
    },
    "/api/ppf-pages/{id}": {
      put: {
        tags: ["PPF Types"],
        summary: "Update a PPF page",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
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
                  slug: { type: "string" },
                  description: { type: "string" },
                  isActive: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "PPF page updated successfully"
          }
        }
      },
      delete: {
        tags: ["PPF Types"],
        summary: "Delete a PPF page",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: {
            description: "PPF page deleted successfully"
          }
        }
      }
    }
  }
};
