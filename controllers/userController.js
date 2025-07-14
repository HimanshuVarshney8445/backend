const User = require('../models/user');

exports.dashboard = (req,res,next)=>{
    const authent = req.cookies.token;
    res.render('store/home',{pageTitle: "Dashboard",authentication: authent});
}

exports.viewResult = (req, res, next)=>{
    const authent = req.cookies.token;
    res.render('store/viewResult', {pageTitle: "View Result",authentication: authent});
}

exports.profile = async (req, res, next)=>{
    const authent = req.cookies.token;
    const user = await User.findById(req.user._id);
    try{
        if(!user){
            throw new Error("User not found");
        }
    }catch(err){
        return next(err);
    }
    res.render('store/profile', {pageTitle: "Profile",authentication: authent, user: user});
}