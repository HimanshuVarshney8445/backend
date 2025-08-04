const Batch = require('../models/batch');
const StudentResult = require("../models/result");

exports.addBatch = async (req,res,next)=>{
    const authent = req.cookies.token;
    res.render('host/add-result',{pageTitle: "Add Result",authentication: authent});
}

exports.addPostBatch = async (req,res,next)=>{
    try {
    const { className, students } = req.body;
    const subjects = req.body.subjectList.split(',').map(s => s.trim());

    // 1. Create new batch document
    const newBatch = new Batch({
      className: className,
      subjects: subjects,
      numberOfEntries: students
    });

    // 2. Save to DB
    await newBatch.save();

    // 4. Render the table page
    res.render("host/table", {
      pageTitle: "Result Table",
      studentCount: students,
      subjects: subjects,
      className: className,
    });

  } catch (err) {
    console.error("Error saving batch:", err);
    res.status(409).render('host/add-result',{pageTitle: "Add Result",authentication: req.cookies.token});
  }
}


exports.submitMarks = async (req, res) => {
  try {
    const { className, subjectList } = req.body;
    const subjects = subjectList.split(",").map((s) => s.trim());

    const students = req.body.students;
    const studentList = Object.values(students); // Convert to array

    const batch = await Batch.create({
      className,
      subjects,
      numberOfEntries: studentList.length,
    });

    for (const student of studentList) {
      const marksMap = new Map();

      for (const subject in student.marks) {
        marksMap.set(subject, parseInt(student.marks[subject]));
      }

      await StudentResult.create({
        batch: batch._id,
        studentName: student.name,
        rollNumber: student.rollNo,
        marks: marksMap,
      });
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error submitting marks:", error);
    res.status(500).send("Internal Server Error");
  }
};