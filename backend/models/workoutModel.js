const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: false,
    },
    bodyPart: {
      type: String,
      required: false,
    },
    equipment: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      required: false,
    },
    gifUrl: {
      type: String,
      required: false,
    },
    sets: {
      type: String,
      required: false,
    },
    reps: {
      type: Object,
      required: false,
    },
    weight: {
      type: Object,
      required: false,
    },
    weightType: {
      type: String,
      required: false,
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
