const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

exports.getLogin = (req,res,next)=>{
    const authent = req.cookies.token;
    res.render("auth/login",{pageTitle:"Login", oldInput: {email:"",password:""},authentication: authent});
}

exports.postLogin = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).render("auth/login", {
            pageTitle: "Login",
            oldInput: {email}
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.render("auth/login",{
            pageTitle: "Login",
            oldInput: {email}
        })
    }
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
    });

    // console.log("UserName:",email);
    // console.log("Password:",password);
    res.redirect("/");
}

exports.getSignUp = (req,res,next)=>{
    const authent = req.cookies.token;
    res.render("auth/signUp",{pageTitle:"sign Up",authentication: authent});
}

exports.postSignUp = async (req,res,next)=>{
    try{
        const {firstName,lastName,email,password} = req.body;
        const exist = await User.findOne({email});
        const hashPassword = await bcrypt.hash(password,12);
        if(exist){
            return res.status(400).send("User already exists");
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.redirect("/login");
    }catch(err){
        console.error("Error during sign up:", err);
        res.status(500).send("Internal Server Error");
    }
}

exports.getLogout = (req,res,next)=>{
    res.clearCookie('token');
    res.redirect("/login");
}