require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const folderRoutes = require("./routes/folder");
const pageRoutes = require("./routes/page");
const textRoutes = require("./routes/textEditor");

const app = express();

// cors
const cors = require("cors");
app.use(cors());

// Middleware that looks at any request that has a body and it passes it to the request object - you can now use req.body
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/texts", textRoutes);

// connec to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
