import { MongoClient, ServerApiVersion } from "mongodb";

// Get MongoDB credentials and host from environment variables
const dbUser = process.env.MONGO_DB_USER || 'user';              // Default to 'user' if not provided
const dbPassword = process.env.MONGO_DB_PASSWORD || 'password';  // Default to 'password' if not provided
const dbName = process.env.MONGO_DB_NAME || 'employee';          // Default to 'employee' if not provided
const dbHost = process.env.MONGO_DB_HOST || 'mongodb';           // Default to 'mongodb' if not provided (service name in docker-compose)
const dbPort = process.env.MONGO_DB_PORT || '27017';             // Default to '27017' if not provided (default MongoDB port)

// Build the Mongo URI dynamically
const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectMongo() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm successful connection
    await client.db().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

// Run the connection function
connectMongo();

// Export the database instance to use in the app
export default client.db();
