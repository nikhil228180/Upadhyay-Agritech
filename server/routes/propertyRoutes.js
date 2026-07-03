

import express from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Protected Admin routes
router.post("/", protect, adminOnly, createProperty);
router.put("/:id", protect, adminOnly, updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);

export default router;