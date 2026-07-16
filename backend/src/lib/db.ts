import dns from "dns";
import mongoose from "mongoose";

// Warp / custom local DNS often breaks mongodb+srv SRV lookups in Node
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  /* ignore */
}

export async function connectDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
  });
  console.log("MongoDB connected", process.env.MONGODB_URI);
}
