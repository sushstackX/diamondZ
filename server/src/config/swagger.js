const swaggerJsDoc = require("swagger-jsdoc");

const benefitDocs = require("../modules/benefit/benefit.swagger");
const processStepDocs = require("../modules/processStep/processStep.swagger");
const faqDocs = require("../modules/faq/faq.swagger");
const ppfPageDocs = require("../modules/ppfPage/ppfPage.swagger");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Diamondz API",
      version: "1.0.0",
      description: "Diamondz PPF Backend APIs",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    tags: [
      { name: "Benefits", description: "Benefits API" },
      { name: "Process Steps", description: "Process Steps API" },
      { name: "FAQ", description: "FAQ API" },
      { name: "PPF Types", description: "PPF Types API" },
    ],

    paths: {
      ...benefitDocs.paths,
      ...processStepDocs.paths,
      ...faqDocs.paths,
      ...ppfPageDocs.paths,
    },
  },

  apis: [],
};

module.exports = swaggerJsDoc(options);