const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const rootDir = require('./utils/pathUtil');
const path = require('path');
const storeRouter = require('./routers/storeRouter');
const hostRouter = require('./routers/hostRouter');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

app.set('view engine','ejs');
app.set('views','views');


app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir,'public')));
app.use(storeRouter);
app.use(hostRouter);
app.use(authRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'error.html'));
});

const mongoUrl = process.env.mongoUrl;

mongoose.connect(mongoUrl).then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on","http://localhost:3000");
    })
}).catch(err=>{
    console.error("Database connection failed:", err);
})
