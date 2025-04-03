import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/diaryController.js";
const router = express.Router();

/**
 * @route GET /api/diary
 * @desc Fetch all diary entries
 * @access Public (Authentication will be added in Part 2)
 */

router.get("/", getAllEntries);

/**
 * @route GET /api/diary/:id
 * @desc Fetch a specific diary entry by ID
 * @access Public (Authentication will be added in Part 2)
 */
router.get("/:id", getEntryById);

/**
 * @route POST /api/diary
 * @desc Create a new diary entry
 */

router.post("/", createEntry);

/**
 * @route PUT /api/diary/:id
 * @desc Update a specific diary entry by ID
 */

router.put("/:id", updateEntry);

/**
 * @route DELETE /api/diary/:id
 * @desc Delete a specific diary entry by ID
 */

router.delete("/:id", deleteEntry);



export default router;
