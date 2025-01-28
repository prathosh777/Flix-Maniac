// import mongoose  from "mongoose";
// import { ENV_variables} from "./envVariables.js";

// export const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(ENV_variables.MONGO_URI);
//     console.log("MongoDB connected : ", connect.connection.host);
//   } catch (error) {
//     console.error("MongoDB not connected : ", error.message);
//     process.exit(1); //1 means failure and 0 means success
//   }
// };
import mongoose from "mongoose";
import { ENV_variables } from "./envVariables.js";

export const connectDB = async () => {
  if (!ENV_variables.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(ENV_variables.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected: ", connect.connection.host);
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};
