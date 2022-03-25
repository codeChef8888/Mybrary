const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");


//All Authors Route
router.get('/', async (req,res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
     try {
        //const authors = await Author.find({});
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {authors: authors, searchOptions: req.query});
     }  catch {

     }
});

//New Author Route 
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author()});
});

//Save Author Route
router.post('/', async (req,res) => {

    const author = new Author({
        name: req.body.nameField
    });
    try{
        const newAuthor = await author.save();
        res.redirect('/authors');
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        });
    }
    //Saving the Author TO MongoDB using callback function
    // author.save((err, newAuthor) => {
    //     if(err){
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error Creating Author'
    //         });
    //     } else {
    //         res.redirect('authors');
    //     }
    // });

});

//Show Author By Id
router.get('/:id', async (req,res) => {  
    let author,books;
    try {
        author = await Author.findById(req.params.id);
        books = await Book.find({author: author.id }).limit(6).exec();
        res.render('authors/show', {author: author, booksByAuthor: books});
    } catch {
        res.redirect('/');
    }
    
});

//Get Author By Id
router.get('/:id/edit', async (req,res) => {
    try {
         const author = await Author.findById(req.params.id);
        res.render('authors/edit', {author: author});

    } catch {
        res.render('/authors')
    }
});

//Update Author By Id
router.put('/:id', async (req,res) => {
  console.log("ma edit author ma xu")
  let author;
    try{ 
        console.log("ma update success ma xu")
        author = await Author.findById(req.params.id);
        console.log(req.body.nameField, 'YO chai NEW name');
         author.name = req.body.nameField; //nameField is what I specified in the Form input field property i.e. name="nameField"
         console.log(author.name);
         await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch {
        if(author == null) {
            res.redirect('/');
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error Creating Author'
            });
        }

    }
});

router.delete('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      await author.remove()
      res.redirect('/authors')
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.redirect(`/authors/${author.id}`)
      }
    }
  })


module.exports = router;
