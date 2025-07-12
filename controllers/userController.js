exports.dashboard = (req,res,next)=>{
    const authent = req.cookies.token;
    res.render('store/home',{pageTitle: "Dashboard",authentication: authent});
}

exports.viewResult = (req, res, next)=>{
    const authent = req.cookies.token;
    res.render('store/viewResult', {pageTitle: "View Result",authentication: authent});
}