const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "CRUD API with JWT Authentication",
  },
  host: "localhost:5001",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter JWT token like: Bearer <token>",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"]; // <-- This is key: must be the entry point that includes the router

swaggerAutogen(outputFile, endpointsFiles, doc);
