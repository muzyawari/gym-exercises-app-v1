const express = require("express");

const {
  getFolders,
  getFolder,
  createFolder,
  deleteFolder,
  updateFolder,
  getAllPages,
} = require("../controllers/FolderController");

const router = express.Router();

// GET all Folders
router.get("/", getFolders);

// Get pages in Folders

// GET a single Folder
router.get("/:id", getFolder);

// POST a new Folder
router.post("/", createFolder);

// DELETE a Folder
router.delete("/:id", deleteFolder);

// UPDATE a Folder
router.patch("/:id", updateFolder);

module.exports = router;
