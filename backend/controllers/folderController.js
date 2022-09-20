const Folder = require("../models/folderModel");
const Page = require("../models/pageModel");
const mongoose = require("mongoose");

// get all folders
const getFolders = async (req, res) => {
  const folders = await Folder.find({}).populate("pages", "title");
  // let foldersWithPages = [];
  // for await (const folder of folders) {
  //   const pages = await Page.find({ folder: folder._doc._id });
  //   foldersWithPages.push({ ...folder._doc, _id: folder._id, pages });
  // }

  res.status(200).json(folders);
};

// get a single folder
const getFolder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such folder" });
  }

  const folder = await Folder.findById(id);

  if (!folder) {
    return res.status(404).json({ error: "No such folder" });
  }

  res.status(200).json(folder);
};

// create a new folder
const createFolder = async (req, res) => {
  const { title } = req.body;

  try {
    const folder = await Folder.create({ title });
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Folder
const deleteFolder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such folder" });
  }

  const folder = await Folder.findOneAndDelete({ _id: id });

  if (!folder) {
    return res.status(400).json({ error: "No such folder" });
  }

  res.status(200).json(folder);
};

// update a Folder
const updateFolder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such folder" });
  }

  const folder = await Folder.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!folder) {
    return res.status(400).json({ error: "No such folder" });
  }

  res.status(200).json(folder);
};

// const getAllPages = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such folder" });
//   }

//   const folder = await Folder.find(id).populate("pages");

//   if (!folder) {
//     return res.status(400).json({ error: "No such folder" });
//   }

//   res.status(200).json(folder);
// };

module.exports = {
  getFolders,
  getFolder,
  createFolder,
  deleteFolder,
  updateFolder,
};
