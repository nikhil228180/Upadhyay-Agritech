import express from "express";
import {
  submitContact,
  getContacts,
  markAsRead,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — anyone can submit a contact inquiry
router.post("/", submitContact);

// Admin only
router.get("/", protect, adminOnly, getContacts);
router.patch("/:id/read", protect, adminOnly, markAsRead);

export default router;
