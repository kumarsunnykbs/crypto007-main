const { createProxyMiddleware } = require("http-proxy-middleware");

// This proxy redirects requests to /api endpoints to
// the Express server running on port 3001.
module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "https://df4c-2405-201-5002-19e3-d04c-83c9-5b74-8d4c.in.ngrok.io",
    })
  );
};
