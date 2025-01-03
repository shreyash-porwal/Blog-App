import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { ConnectToDB } from "./config/DBConnect.js";
import router from "./routes/index.js";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";

dotenv.config();
ConnectToDB();

const app = express();
const port = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies first
app.use(checkForAuthenticationCookie("token")); // Attach user from token if available

// Routes
app.use('/api', router); // Ensure /api routes also get middleware benefits

app.get("/", (req, res) => {
  // Handle favicon requests
  if (req.url.endsWith("favicon.ico")) return res.status(204).send();

  console.log("User from token:", req.user); // Debug log for user data
  res.render("home", { user: req.user || null }); // Pass user (if any) to the home view
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
