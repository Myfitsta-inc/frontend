const createProxyMiddleware = require("http-proxy-middleware");
const proxyUrl =
  process.env.NODE_ENV === "production"
    ? "https://myfitsta-backend-app-server.herokuapp.com/"
    : "http://localhost:8000/";
module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    })
  );
};
