import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ConnectToDB } from "./config/DBConnect.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import {checkForAuthenticationCookie} from "./middleware/authentication.js"
dotenv.config();
ConnectToDB();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.get("/", (req, res) => {
  if (req.url.endsWith("favicon.ico")) res.send(null);
  res.render("home",{user:req.user});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
