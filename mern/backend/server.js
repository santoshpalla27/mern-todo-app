import express from "express";
import cors from "cors";
import records from "./routes/record.js";  // Assuming this file handles routes for /record

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Ensure this route is correctly defined
app.use("/backend/record", records);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
