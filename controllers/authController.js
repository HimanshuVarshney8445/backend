exports.getLogin = (req,res,next)=>{
    res.render("auth/login",{pageTitle:"Login"});
}

exports.postLogin = (req,res,next)=>{
    const {userName,password} = req.body;
    console.log("UserName:",userName);
    console.log("Password:",password);
    res.redirect("/");
}

exports.getSignUp = (req,res,next)=>{
    res.render("auth/signUp",{pageTitle:"sign Up"});
}

exports.postSignUp = (req,res,next)=>{
    res.redirect("/");
}