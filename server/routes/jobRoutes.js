import { Router } from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/getall", getAllJobs);
router.post("/post", protect, postJob);
router.get("/getmyjobs", protect, getMyJobs);
router.put("/update/:id", protect, updateJob);
router.delete("/delete/:id", protect, deleteJob);
router.get("/:id", protect, getSingleJob);

export default router;
