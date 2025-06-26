exports.addResult = (req,res,next)=>{
    res.render('host/add-result',{pageTitle: "Add Result"});
}

exports.addPostResult = (req,res,next)=>{
    const{className,students}=req.body;
    const subjects = req.body.subjectList.split(',').map(s => s.trim());
    console.log("Class:",className);
    console.log("No. of students:",students);
    res.render("host/table",{pageTitle: "Result Table",studentCount: students,subjects: subjects, className: className});
}


