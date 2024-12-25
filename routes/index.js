import Router from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/signup', async function (req, res ){
    
    return res.render("signup");
});
router.post('/signup', async function (req, res ){
    const {name,email,password} = req.body;
    await User.create({name:name,email:email,password:password});
    return res.redirect("/");
});

export default router;