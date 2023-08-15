const catchAsync = require("../utils/catchAsync")
const Job = require("../models/jobs.model")

const {ref, uploadBytes, getDownloadURL} = require("firebase/storage");
const { storage } = require("../utils/firebase");

exports.createJob = catchAsync(async(req, res) => {
    const {sessionProfessional} = req
    const {work_name, description, } = req.body

    const jobImgPromises = req.files.map(async(file) => {
        const imgRef = ref(storage, `jobs/${Date.now()}-${file.originalname}`)
        const imgUploaded = await uploadBytes(imgRef, file.buffer)

        const url = await getDownloadURL(imgRef)
        
      return await Job.create({
        work_name, 
        description,
        imageUrl: url,
        professional_id: sessionProfessional.id
        })
        
    })

   
    await Promise.all(jobImgPromises)

    return res.status(201).json({
        status: "Success",
    })


})

exports.findMyJobs = catchAsync(async(req, res) => {
    const {sessionProfessional} = req

    const jobs = await Job.findAll({
        where: {
            professional_id: sessionProfessional.id,
            status: "active"
        }
    })

    // const jobsPromise = jobs.map(async job => {
    //     const imgRef = ref(storage, job.imageUrl)
    //     const url = await getDownloadURL(imgRef)

    //     job.imageUrl = url
    //     return job
    // })

    // const jobsResolve = await Promise.all(jobsPromise)

    return res.status(200).json({
        status: "Success",
        results: jobs.length,
        jobs
    })
})

exports.allJobs = catchAsync(async(req, res) => {
    const jobs = await Job.findAll({
        where: {status: "active"}
    })

    // const jobsPromise = jobs.map(async job => {
    //         const imgRef = ref(storage, job.imageUrl)
    //         const url = await getDownloadURL(imgRef)

    //         job.imageUrl = url
    //         console.log(job);
    //         return job
       
    // })

    // const jobsResolve = await Promise.all(jobsPromise)

    res.status(200).json({
        status: "Success",
        jobs
    })

})

exports.findOneJob = catchAsync(async(req, res) => {
    const {job} = req

    // const imgRef = ref(storage, job.imageUrl)
    // const urlImageJob = await getDownloadURL(imgRef)

    // job.imageUrl = urlImageJob

    return res.status(200).json({
             status: "Success",
             job,
     })
})

exports.updateJobs = catchAsync(async(req, res) => {
   
})

exports.deleteJobs = catchAsync(async(req, res) => {
    const {job} = req

    await job.update({
        status: "disable"
    })

    return res.status(200).json({
        status: "Success"
    })
})

