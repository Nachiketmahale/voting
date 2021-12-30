const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const path=require('path');
const app=express();

//DB config
const db=require('./config/keys').MongoURI;

//connect to mongo

mongoose.connect(db,{useNewUrlParser:true})
.then(console.log("Database Connected"))
.catch(err=>console.log(err));


//ejs middleware

// app.use(expressLayouts);
// app.set('view engine','ejs');
const staticPath=path.join(__dirname,"./public");
app.use(express.static(staticPath));

app.use(express.urlencoded({extended:false}))

app.use('/',require('./routes/index'))

//listening on port

app.listen(3000,()=>{
    console.log("Server is up and running");
})