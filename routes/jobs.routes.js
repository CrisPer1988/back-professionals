const express = require("express")

const jobsController = require("../controllers/jobs.controller")
const validJob = require("../middlewares/jobs.middleware")
const {upload} = require("../utils/multer")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router
.route("/")
.get(jobsController.allJobs)
.post(upload.array("imageUrl", 1), authMiddleware.protectProfessional, jobsController.createJob)

router
.get("/me", authMiddleware.protectProfessional, jobsController.findMyJobs)

router
.route("/:id")
.get(validJob.validIfExistJob, jobsController.findOneJob)
.delete(validJob.validIfExistJob, jobsController.deleteJobs)

module.exports = router