const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
