import { mongoose } from "mongoose";
import DiaryEntry from "../models/DiaryEntry.js";
import { fetchWeather } from "./weatherController.js";

// const createEntry = async (req, res) => {
//   try {
//     const { title, content, reflection, tags, location } = req.body;
//     // Fetch weather data if location is provided
//     const weatherData = location ? await fetchWeather(location) : null;
//     const newEntry = new DiaryEntry({
//       user: req.user.id, // authentication is added in Part 2
//       title,
//       content,
//       reflection,
//       tags,
//       location,
//       weather: weatherData,
//     });
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

/**
 * @route POST /api/diary
 * @desc Create a new diary entry
 * @access Public (Authentication will be added in Part 2)
 *
 * TODO: Implement this function.
 * - Extract required fields (title, content, location, tags, etc.) from `req.body`
 * - Validate that title, content, and location are provided
 * - Create a new `DiaryEntry` object and save it to the database
 * - Return a `201 Created` response with the new entry
 */

// test user
const testUser = new mongoose.Types.ObjectId();

const createEntry = async (req, res) => {
  try {
    // TODO: Implement the function
    const { user, title, content, reflection, location, tags } =
      req.body;


    // fetch weather data if location is provided
    const weatherData = location ? await fetchWeather(location) : null;

    const newEntry = new DiaryEntry({
      user: testUser,
      title,
      content,
      reflection,
      tags,
      location,
      weather: weatherData,
    });

    await newEntry.save();
	res.status(201).json(newEntry);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @route PUT /api/diary/:id
 * @desc Update an existing diary entry
 * @access Public (Authentication will be added in Part 2)
 *
 * TODO: Implement this function.
 * - Extract updated fields from `req.body`
 * - Find the entry by `req.params.id` and update it
 * - Ensure that the entry exists before updating
 * - Return the updated entry with a `200 OK` status
 */
const updateEntry = async (req, res) => {
  // TODO: Implement the function
};

/**
 * @route DELETE /api/diary/:id
 * @desc Delete a diary entry
 * @access Public (Authentication will be added in Part 2)
 *
 * TODO: Implement this function.
 * - Find the entry by `req.params.id` and delete it
 * - Ensure that the entry exists before deleting
 * - Return a success message with a `200 OK` status
 */
const deleteEntry = async (req, res) => {
  // TODO: Implement the function
};

/**
 * @route GET /api/diary
 * @desc Fetch all diary entries with optional filters
 * @access Public (Authentication will be added in Part 2)
 */
const getAllEntries = async (req, res) => {
  try {
    const { search, tag, location } = req.query;
    let filter = {}; // No authentication in Part 1, so no user filter is applied

    // Search filter (Matches title or content)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Tag filter (Exact match)
    if (tag) {
      filter.tags = tag;
    }

    // Location filter (Exact match)
    if (location) {
      filter.location = location;
    }

    // Fetch filtered results and sort by newest first
    const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error: Unable to fetch diary entries" });
  }
};

/**
 * @route GET /api/diary/:id
 * @desc Fetch a single diary entry by ID
 * @access Public (Authentication will be added in Part 2)
 */
const getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error: Unable to retrieve diary entry" });
  }
};

export { createEntry, getAllEntries, getEntryById, updateEntry, deleteEntry };
