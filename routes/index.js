import Router from "express";
import User from "../models/user.js";
const router = Router();
router.get("/signup", async function (req, res) {
  return res.render("signup");
});
router.post("/signup", async function (req, res) {
  const { fullName, email, password } = req.body;
  await User.create({ name: fullName, email: email, password: password });
  return res.redirect("/");
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("login", { error: "Incorrect Email or Password" });
  }
});

router.get("/login", async function (req, res) {
  return res.render("login");
});
router.get("/logout", async function (req, res) {
  return res.clearCookie("token").redirect("/");
});
export default router;
