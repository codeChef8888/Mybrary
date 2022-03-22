if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app =  express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter =  require("./routes/index")

//Setting up the View
app.set("view engine", "ejs");
//set the path to Layouts i.e Boiler Plate HTML 
app.set('layout', 'layouts/layout')
app.use(expressLayouts);


//Setting Up the DataBase Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/",indexRouter);

app.listen(process.env.PORT || 3000);

