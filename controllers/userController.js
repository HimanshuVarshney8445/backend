const User = require('../models/user');

exports.dashboard = async (req,res,next)=>{
    const authent = req.cookies.token;
    res.render('store/home',{pageTitle: "Dashboard",authentication: authent});
}

exports.viewResult = async (req, res, next)=>{
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
exports.update = async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;

        await user.save();
        res.redirect('/profile');
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Internal Server Error");
    }
};
