import { asyncHandler } from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { ensureRole } from "../middleware/auth.js";
import { Job } from "../models/jobModel.js";

// @desc    Get all active (non-expired) jobs
// @route   GET /api/v1/job/getall
export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ expired: false }).sort({ jobPostedOn: -1 });
  res.status(200).json({ success: true, jobs });
});

// @desc    Get single job by id
// @route   GET /api/v1/job/:id
export const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).catch(() => null);
  if (!job) {
    throw new ApiError("Job not found.", 404);
  }
  res.status(200).json({ success: true, job });
});

// @desc    Get jobs posted by the logged-in employer
// @route   GET /api/v1/job/getmyjobs
export const getMyJobs = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Employer");
  const myJobs = await Job.find({ postedBy: req.user._id }).sort({ jobPostedOn: -1 });
  res.status(200).json({ success: true, myJobs });
});

// @desc    Create a new job (employer only)
// @route   POST /api/v1/job/post
export const postJob = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Employer");
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    throw new ApiError("Please provide full job details.", 400);
  }
  if (!fixedSalary && !(salaryFrom && salaryTo)) {
    throw new ApiError("Please either provide fixed salary or ranged salary.", 400);
  }
  if (fixedSalary && (salaryFrom || salaryTo)) {
    throw new ApiError("Cannot Enter Fixed and Ranged Salary together.", 400);
  }

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary: fixedSalary || undefined,
    salaryFrom: salaryFrom || undefined,
    salaryTo: salaryTo || undefined,
    postedBy: req.user._id,
  });
  res.status(201).json({ success: true, message: "Job Posted Successfully!", job });
});

// @desc    Update a job (employer only)
// @route   PUT /api/v1/job/update/:id
export const updateJob = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Employer");
  const job = await Job.findById(req.params.id);
  if (!job) {
    throw new ApiError("OOPS! Job not found.", 404);
  }
  await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, message: "Job Updated!" });
});

// @desc    Delete a job (employer only)
// @route   DELETE /api/v1/job/delete/:id
export const deleteJob = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Employer");
  const job = await Job.findById(req.params.id);
  if (!job) {
    throw new ApiError("OOPS! Job not found.", 404);
  }
  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job Deleted!" });
});
