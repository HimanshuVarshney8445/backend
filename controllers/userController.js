exports.dashboard = (req,res,next)=>{
    res.render('store/home',{pageTitle: "Dashboard"});
}