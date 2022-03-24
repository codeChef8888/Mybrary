//Initializing the Environment Variables
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
//Importing Express Package
const express = require("express");
const app =  express();


//parse json information from the body
app.use(express.json());
// //Inorder To access the Body of Request
// app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//Importing express-ejs-layouts package
const expressLayouts = require("express-ejs-layouts");

//Importing Different Routes
const indexRouter =  require("./routes/index");
const authorRouter =  require("./routes/authors");
const bookRouter =  require("./routes/books");

//Setting up the View
app.set("view engine", "ejs");
//set the path to Layouts i.e Boiler Plate HTML 
app.set('layout', 'layouts/layout')
app.use(expressLayouts);

//To use static files in public directory.. very absurd
app.use(express.static("public"));


//Setting Up the DataBase Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

//Hooking up our Different Routers to Route
app.use("/",indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

//Specifying the Port To Listen At with Default port: 3000
app.listen(process.env.PORT || 3000);

