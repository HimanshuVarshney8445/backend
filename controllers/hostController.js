exports.addResult = (req,res,next)=>{
    res.render('host/add-result',{pageTitle: "Add Result"});
}

exports.addPostResult = (req,res,next)=>{
    const{className,students}=req.body;
    console.log("Class:",className);
    console.log("No. of students:",students);
    res.redirect("/");
}
    