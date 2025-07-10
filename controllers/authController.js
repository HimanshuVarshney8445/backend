const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next)=>{
    res.render("auth/login",{pageTitle:"Login", oldInput: {email:"",password:""}});
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
    // console.log("UserName:",email);
    // console.log("Password:",password);
    res.redirect("/");
}

exports.getSignUp = (req,res,next)=>{
    res.render("auth/signUp",{pageTitle:"sign Up"});
}

exports.postSignUp = (req,res,next)=>{
    res.redirect("/login");
}