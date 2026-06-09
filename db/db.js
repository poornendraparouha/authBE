import mongoose from "mongoose";

const dbConnection = async () => {

   try {
      await mongoose.connect(process.env.DATABASE_URI)
      console.log("DB connected")

   } catch (err) {
      console.error("Error connecting DB", err)
      process.exit(1);
   }

}

export default dbConnection;