const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textEditorSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("textEditor", textEditorSchema);
