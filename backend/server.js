import express from "express";
import cookieParser from "cookie-parser";
import authroutes from "./routes/auth-routes.js";
import movieroutes from "./routes/movie-routes.js";
import tvroutes from "./routes/tv-routes.js";
import searchroutes from "./routes/search-routes.js";
import { ENV_variables } from "./config/envVariables.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import path from "path";
const app = express();
const __dirname = path.resolve();
const PORT = ENV_variables.PORT;
app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/movie", protectRoute, movieroutes);
app.use("/api/v1/tv", protectRoute, tvroutes);
app.use("/api/v1/search", protectRoute, searchroutes);
if (ENV_variables.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
