import { matchedData, validationResult } from "express-validator";
import Lead from "../models/Lead.js";
import { sendLeadEmail } from "../services/mailService.js";

export const createLead = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const cleanData = matchedData(req, { locations: ["body"] });

    if (!cleanData.name?.trim() || !cleanData.phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const savedLead = await Lead.create({
      name: cleanData.name,
      phone: cleanData.phone,
      businessType: cleanData.businessType || "",
      message: cleanData.message || "",
    });

    await sendLeadEmail(savedLead);

    return res.status(201).json({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllLeads = async (_req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
