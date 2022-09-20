const express = require("express");

const {
  getPages,
  getPage,
  createPage,
  deletePage,
  updatePage,
} = require("../controllers/PageController");

const router = express.Router();

// GET all Pages
router.get("/", getPages);

// GET a single Page
router.get("/:id", getPage);

// POST a new Page
router.post("/", createPage);

// DELETE a Page
router.delete("/:id", deletePage);

// UPDATE a Page
router.put("/:id", updatePage);

module.exports = router;
