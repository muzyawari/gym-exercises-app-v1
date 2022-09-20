const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
