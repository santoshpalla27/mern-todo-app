const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasks = require("./routes/tasks");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/tasks", tasks);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
