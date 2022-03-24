const mongoose = require('mongoose'); // Mongoose is the library we use to connect to MongoDB


//Scehma in essentially a Table in normal SQL database.

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    publishDate: {
      type: Date,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    coverImage: {
      type: Buffer,
      required: true
    },
    coverImageType: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, //this is the Book Object Id.
      required: true,
      ref: 'Author'
    }
})
bookSchema.virtual('coverImagePath').get(function() {
  if(this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
  }
})

module.exports = mongoose.model('Book', bookSchema); // here 'Book' is the name of Schema in MongoDB

