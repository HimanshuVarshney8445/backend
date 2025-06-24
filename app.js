const express = require('express');
const app = express();
const rootDir = require('./utils/pathUtil');
const path = require('path');
const storeRouter = require('./routers/storeRouter');
const hostRouter = require('./routers/hostRouter');

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir,'public')));
app.use(storeRouter);
app.use(hostRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'error.html'));
});

app.listen(3000,()=>{
    console.log("Server is running on","http://localhost:3000");
})