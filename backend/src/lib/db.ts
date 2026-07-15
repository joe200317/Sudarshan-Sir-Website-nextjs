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

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 12000,
    });
    console.log("MongoDB connected");
    return;
  } catch (err) {
    console.error("Primary MongoDB connection failed:", err);
    if (process.env.ALLOW_MEMORY_FALLBACK === "0") throw err;
    console.warn(
      "Falling back to in-memory MongoDB (dev only — data resets when server stops)",
    );
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mem = await MongoMemoryServer.create();
  await mongoose.connect(mem.getUri("mindtrainer"));
  console.log("MongoDB connected (in-memory fallback)");
}
