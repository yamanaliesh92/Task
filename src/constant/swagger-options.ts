export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Magic Transporters Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Magic API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
