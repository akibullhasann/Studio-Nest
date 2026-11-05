import { MongoClient } from "mongodb";

// Reuse one MongoClient across serverless invocations (Vercel reuses containers).
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

export async function getMongoClient() {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(process.env.MONGODB_URI as string);
    await globalForMongo._mongoClient.connect();
  }
  return globalForMongo._mongoClient;
}

export async function getStudioCollection() {
  const client = await getMongoClient();
  return client.db("studioNest").collection("studioSpace");
}

export async function getBookingCollection() {
  const client = await getMongoClient();
  return client.db("studioNest").collection("bookings");
}
