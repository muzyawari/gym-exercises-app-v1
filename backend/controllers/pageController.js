const Page = require("../models/pageModel");
const mongoose = require("mongoose");

const Folder = require("../models/folderModel");

// get all pages
const getPages = async (req, res) => {
  const pages = await Page.find({});

  res.status(200).json(pages);
};

// get a single page
const getPage = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such Page" });
  // }
  let folderWithPages;
  folderWithPages = await Folder.findById(id).populate("pages", "title");

  console.log(folderWithPages);
  // const page = await Page.findById(id);

  // if (!page) {
  //   return res.status(404).json({ error: "No such Page" });
  // }

  // res.status(200).json(folderWithPages);
};

// create a new page
const createPage = async (req, res) => {
  const { title, folder } = req.body;
  let findFolder;

  try {
    findFolder = await Folder.findById(folder);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  try {
    const page = await Page.create({ title, folder });

    findFolder.pages.push(page);

    findFolder.save({});
    // console.log("page", page);

    res.status(200).json(page);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  // try {
  //   const page = await Page.create({ title, folder });

  //   res.status(200).json(page);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
};

// delete a page
const deletePage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such page" });
  }

  const page = await Page.findOneAndDelete({ _id: id });

  if (!page) {
    return res.status(400).json({ error: "No such page" });
  }

  res.status(200).json(page);
};

// update a page
const updatePage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such page" });
  }

  const page = await Page.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!page) {
    return res.status(400).json({ error: "No such page" });
  }

  res.status(200).json(page);
};

module.exports = {
  getPages,
  getPage,
  createPage,
  deletePage,
  updatePage,
};
