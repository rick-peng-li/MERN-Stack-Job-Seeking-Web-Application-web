import { Router } from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/post", protect, postApplication);
router.get("/employer/getall", protect, employerGetAllApplications);
router.get("/jobseeker/getall", protect, jobseekerGetAllApplications);
router.delete("/delete/:id", protect, jobseekerDeleteApplication);

export default router;
