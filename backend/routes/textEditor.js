const express = require("express");

const {
  getTexts,
  getText,
  createText,
} = require("../controllers/TextEditorController");

const router = express.Router();

// GET all Folders
router.get("/", getTexts);

// Get pages in Folders

// GET a single Folder
router.get("/:id", getText);

// POST a new Folder
router.post("/", createText);

// DELETE a Folder
// router.delete("/:id", deleteFolder);

// UPDATE a Folder
// router.patch("/:id", updateFolder);

module.exports = router;
