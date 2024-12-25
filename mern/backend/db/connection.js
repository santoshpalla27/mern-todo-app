import { MongoClient, ServerApiVersion } from "mongodb";

// Fetch MongoDB connection details from environment variables
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DB = process.env.MONGO_DB;

if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_HOST || !MONGO_DB) {
  throw new Error("MongoDB environment variables are not properly defined");
}

// Construct the MongoDB URI
const URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin`;

// Initialize the MongoDB client
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1); // Exit with failure if connection fails
}

// Use the specified database
let db = client.db(MONGO_DB);

export default db;
