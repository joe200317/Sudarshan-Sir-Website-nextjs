import dns from "dns";
import mongoose from "mongoose";

// Warp / custom local DNS often breaks mongodb+srv SRV lookups in Node
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  /* ignore */
}

export async function connectDb(uri: string) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });
  console.log("MongoDB connected");
}
