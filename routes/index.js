import Router from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/signup', async function (req, res ){
    
    return res.render("signup");
});
router.post('/signup', async function (req, res) {
    console.log("Form submitted, body data: ", req.body);
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);
    await User.create({ name: fullName, email: email, password: password });
    return res.redirect("/");
});


export default router;