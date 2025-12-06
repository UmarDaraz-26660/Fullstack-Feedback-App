import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Feedback from "./models/Feedback.js";

const app = express();

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.render("index", { feedbacks });  



  
});

app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  await Feedback.create({ name, email, message });
  res.redirect("/");
});

// Start server
// app.listen(5000, () => console.log("Server running at http://localhost:5000"));
export default app;
