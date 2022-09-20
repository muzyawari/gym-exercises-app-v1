const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const Page = require("../models/pageModel");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({});

  res.status(200).json(workouts);
};

// get workouts from page id

const getWorkoutFromPageId = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such page" });
  // }

  let pageWithWorkouts;

  try {
    pageWithWorkouts = await Page.findById(id).populate("workouts");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  res.json(pageWithWorkouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const {
    name,
    bodyPart,
    equipment,
    target,
    gifUrl,
    sets,
    reps,
    weight,
    page,
  } = req.body;

  let findPage;

  try {
    findPage = await Page.findById(page);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  try {
    const workout = await Workout.create({
      name,
      bodyPart,
      equipment,
      target,
      gifUrl,
      sets,
      reps,
      weight,
      page,
    });

    findPage.workouts.push(workout);
    findPage.save({});

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  let workout;
  try {
    workout = await Workout.findById(id).populate("page");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!workout) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    await workout.remove({});
    workout.page.workouts.pull(workout);
    await workout.page.save({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  // console.log(workout);
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such workout" });
  // }

  // const workout = await Workout.findOneAndDelete({ id: id });

  // console.log(workout);

  // if (!workout) {
  //   return res.status(400).json({ error: "No such workout" });
  // }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkoutFromPageId,
};
