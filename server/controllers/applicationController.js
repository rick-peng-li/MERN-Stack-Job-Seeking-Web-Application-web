import { asyncHandler } from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { ensureRole } from "../middleware/auth.js";
import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import { uploadResume, RESUME_MIME_TYPES } from "../utils/upload.js";

// @desc    Submit a job application with resume (job seeker only)
// @route   POST /api/v1/application/post
export const postApplication = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Job Seeker");

  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ApiError("Resume File Required!", 400);
  }
  const { resume } = req.files;
  if (!RESUME_MIME_TYPES.includes(resume.mimetype)) {
    throw new ApiError("Invalid file type. Please upload a PNG, JPG or WEBP file.", 400);
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  if (!name || !email || !coverLetter || !phone || !address) {
    throw new ApiError("Please fill all fields.", 400);
  }
  if (!jobId) {
    throw new ApiError("Job not found!", 404);
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    throw new ApiError("Job not found!", 404);
  }

  const resumeData = await uploadResume(resume);
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID: { user: req.user._id, role: "Job Seeker" },
    employerID: { user: jobDetails.postedBy, role: "Employer" },
    resume: resumeData,
  });
  res.status(201).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// @desc    Get all applications received by the logged-in employer
// @route   GET /api/v1/application/employer/getall
export const employerGetAllApplications = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Employer");
  const applications = await Application.find({ "employerID.user": req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, applications });
});

// @desc    Get all applications submitted by the logged-in job seeker
// @route   GET /api/v1/application/jobseeker/getall
export const jobseekerGetAllApplications = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Job Seeker");
  const applications = await Application.find({ "applicantID.user": req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, applications });
});

// @desc    Withdraw an application (job seeker only)
// @route   DELETE /api/v1/application/delete/:id
export const jobseekerDeleteApplication = asyncHandler(async (req, res) => {
  ensureRole(req.user, "Job Seeker");
  const application = await Application.findById(req.params.id);
  if (!application) {
    throw new ApiError("Application not found!", 404);
  }
  await application.deleteOne();
  res.status(200).json({ success: true, message: "Application Deleted!" });
});
