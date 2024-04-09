const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Proxideal",
    description:
      "API defined for a sample project during the course 'Développement Informatique III' à l'EPHEC Louvain-la-Neuve",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);