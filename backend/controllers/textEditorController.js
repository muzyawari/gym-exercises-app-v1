const Text = require("../models/textEditorModel");
const mongoose = require("mongoose");

// get all folders
const getTexts = async (req, res) => {
  const texts = await Text.find({});
  res.status(200).json(texts);
};

const getText = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such folder" });
  }

  const folder = await Text.findById(id);

  if (!folder) {
    return res.status(404).json({ error: "No such folder" });
  }

  res.status(200).json(folder);
};

// create a new folder
const createText = async (req, res) => {
  const { text } = req.body;

  try {
    const folder = await Text.create({ text });
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Folder
// const deleteFolder = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "No such folder" });
//   }

//   const folder = await Folder.findOneAndDelete({ _id: id });

//   if (!folder) {
//     return res.status(400).json({ error: "No such folder" });
//   }

//   res.status(200).json(folder);
// };

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

module.exports = {
  getTexts,
  createText,
  getText,
};
