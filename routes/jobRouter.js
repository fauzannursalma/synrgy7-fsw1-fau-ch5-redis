const router = require("express").Router();
const { getJobs } = require("../services/jobServices");

router.get("/", getJobs);

module.exports = router;
