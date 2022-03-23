const mongoose = require('mongoose'); // Mongoose is the library we use to connect to MongoDB

//Scehma in essentially a Table in normal SQL database.

const authorSchema = new mongoose.Schema({
    //Here, Define Columns with properties. e.g type/required/etc
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema); // here 'Author' is the name of Schema in MongoDB