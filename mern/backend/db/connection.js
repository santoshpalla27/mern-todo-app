import { MongoClient, ServerApiVersion } from "mongodb";

// Get MongoDB credentials and database name from environment variables
const username = process.env.MONGO_USERNAME || "myuser";   // Default username if not set
const password = process.env.MONGO_PASSWORD || "mypassword";  // Default password if not set
const dbName = process.env.MONGO_DB_NAME || "employee";   // Default database if not set

// Construct MongoDB URI with username, password, and database name
const URI = `mongodb://${username}:${password}@mongodb:27017/${dbName}`;

// Create the MongoClient
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
  await client.db().command({ ping: 1 });  // Default to the specified database
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}

// The database is already specified in the URI, no need to explicitly mention it here
export default client.db();
