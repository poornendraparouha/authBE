import mongoose from "mongoose";
import logger from "../utils/logger.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    logger.info({
      event: "DATABASE_CONNECTED",
      database: mongoose.connection.name,
      host: mongoose.connection.host,
    });

  } catch (error) {
    logger.error({
      event: "DATABASE_CONNECTION_FAILED",
      error: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
};
export default dbConnection;
// Connection Events

// mongoose.connection.on("connected", () => {
//   logger.info({
//     event: "DATABASE_CONNECTED_EVENT",
//   });
// });

// mongoose.connection.on("disconnected", () => {
//   logger.warn({
//     event: "DATABASE_DISCONNECTED",
//   });
// });

// mongoose.connection.on("error", (error) => {
//   logger.error({
//     event: "DATABASE_ERROR",
//     error: error.message,
//   });
// });

// Graceful Shutdown

// process.on("SIGINT", async () => {
//   await mongoose.connection.close();

//   logger.info({
//     event: "DATABASE_CONNECTION_CLOSED",
//     reason: "Application terminated",
//   });

//   process.exit(0);
// });

// export default dbConnection;
