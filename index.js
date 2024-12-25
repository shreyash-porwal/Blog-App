import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ConnectToDB } from "./config/DBConnect.js";
import router from "./routes/index.js";
dotenv.config();
ConnectToDB();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use('/api',router);
app.get("/", (req, res) => {
  if (req.url.endsWith("favicon.ico")) res.send(null);
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
