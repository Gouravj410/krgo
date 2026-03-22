import express from "express";
import { createLead, getAllLeads } from "../controllers/leadController.js";
import { createLeadValidator } from "../validators/leadValidators.js";

const router = express.Router();

router.post("/", createLeadValidator, createLead);
router.get("/", getAllLeads);

export default router;
