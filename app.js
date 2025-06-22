const express = require('express');
const app = express();
const rootDir = require('./utils/pathUtil');
const path = require('path');
const storeRouter = require('./routers/storeRouter');

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,'public')));
app.use(storeRouter);

app.listen(3000,()=>{
    console.log("Server is running on","http://localhost:3000");
})