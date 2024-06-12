// swagger/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-koa");
const Router = require("koa-router");
const path = require("path");

const swaggerDefinition = {
  openapi: "2.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API Documentation for Koa Project",
  },
  servers: [
    {
      url: "http://localhost:9000",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [path.join(__dirname, "../app/api/v1/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

const router = new Router();
router.get("/swagger.json", async (ctx) => {
  ctx.body = swaggerSpec;
});

module.exports = {
  swaggerUi,
  swaggerSpec,
  router,
};
