const mongoose = require('mongoose'); // Mongoose is the library we use to connect to MongoDB
const Book = require('./book')
//Scehma in essentially a Table in normal SQL database.

const authorSchema = new mongoose.Schema({
    //Here, Define Columns with properties. e.g type/required/etc
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
      if (err) {
        next(err)
      } else if (books.length > 0) {
        next(new Error('This author has books still'))
      } else {
        next()
      }
    })
  })

module.exports = mongoose.model('Author', authorSchema); // here 'Author' is the name of Schema in MongoDB