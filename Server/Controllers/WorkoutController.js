const WorkoutCollection = require("../Models/WorkoutModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const { startDate, endDate } = req.query; // Accept startDate and endDate from query

  let query = { user_id };

  if (startDate) {
    query.date = { ...query.date, $gte: new Date(startDate) };
  }

  if (endDate) {
    query.date = { ...query.date, $lte: new Date(endDate) };
  }

  const workouts = await WorkoutCollection.find(query).sort({ date: 1 });

  res.status(200).json(workouts);
};

//get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await WorkoutCollection.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, reps, sets, weight } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;

    const newWorkout = await WorkoutCollection.create({
      title,
      reps,
      sets,
      weight,
      user_id,
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await WorkoutCollection.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  const workout = await WorkoutCollection.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
