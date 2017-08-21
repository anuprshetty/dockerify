import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  try {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "" },
        changeOrigin: false, // make changeOrigin: true if CORS (Cross-Origin Resource Sharing) not enabled in the backend server.
      })
    );
  } catch (err) {
    console.log(err.message);
  }
};
