exports.dashboard = (req,res,next)=>{
    res.render('store/home',{pageTitle: "Dashboard"});
}

exports.viewResult = (req, res, next)=>{
    res.render('store/viewResult', {pageTitle: "View Result"});
}