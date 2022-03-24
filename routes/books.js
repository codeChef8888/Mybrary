const express = require("express");
const router = express.Router();
//Assists us to work with multipart/form-data



const Author = require("../models/author");
const Book = require("../models/book");


//MultiPart File Upload
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']




//All Books Route
router.get('/', async (req, res) => {
    let query = Book.find();
    if(req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate',req.query.publishedBefore);
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate',req.query.publishedAfter);
    }
    try{
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch {
        res.render('/');
    }

});

//New Book Route 
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book());
});

//Save Book Route
router.post('/', async (req, res) => {
    console.log("Post Book tira ko request body");


    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
    console.log(JSON.parse(req.body.cover), 'this is the json data');
    saveCover(book, req.body.cover);
    try {
        const newBook = await book.save();
        console.log(book ,"Ma ya save ma xu");
        res.redirect('books');

    } catch {
        console.log('Ma rejected ma xu hai')
        console.log(book);
        renderNewPage(res, book, true);

    }
});

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      book.coverImage = new Buffer.from(cover.data, 'base64')
      book.coverImageType = cover.type
    }
  }




async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        //For Dynamically Setting The Error Message
        const params = {
            book: book,
            authors: authors
        }
        if (hasError) params.errorMessage = 'Error Creating New Book';
        res.render('books/new', params);
    } catch {
        res.redirect('books');
    }
}

module.exports = router;

