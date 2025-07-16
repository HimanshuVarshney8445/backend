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
    const authent = req.cookies.token;
    const user = await User.findOne({email});
    try{
        if(!user){
            return res.status(401).render("auth/login", {
                pageTitle: "Login",
                oldInput: {email},
                authentication: authent
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.render("auth/login",{
                pageTitle: "Login",
                oldInput: {email},
                authentication: authent,
            })
        }
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        });
        return res.redirect("/");
    }catch(err){
        console.error("Error during login:", err);
        res.status(500).render("auth/login", {
            pageTitle: "Login",
            oldInput: {email},
            authentication: authent
        });
    }

}

exports.getSignUp = (req,res,next)=>{
    const authent = req.cookies.token;
    res.render("auth/signUp",{pageTitle:"sign Up",authentication: authent});
}

exports.postSignUp = async (req,res,next)=>{
    try{
        const {firstName,lastName,email,password,role} = req.body;
        const exist = await User.findOne({email});
        const hashPassword = await bcrypt.hash(password,12);
        if(exist){
            return res.status(400).send("User already exists");
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role
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