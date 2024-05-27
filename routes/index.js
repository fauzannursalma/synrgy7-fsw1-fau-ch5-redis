const Router = require("express").Router();
const jobRouter = require("./jobRouter");

Router.get("/", (req, res) => {
  res.status(200).send({ message: "Connected!" });
});
Router.get("/jobs", jobRouter);

module.exports = Router;
