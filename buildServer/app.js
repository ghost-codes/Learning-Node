const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://admin:test1234@nodetuts.pxhce.mongodb.net/nodeTuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
    }).catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');
app.set('views', './buildServer/views');


//listen for requests


app.use(express.static('buildServer/public'))
app.use(morgan('dev'));


//mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new Blog',
        snippet: 'about my new blog',
        body: 'Duis deserunt ipsum aliqua voluptate incididunt est elit labore duis proident. Dolore mollit non est irure proident est veniam voluptate. Eu non sunt sint ea ullamco occaecat cillum sunt nulla adipisicing est officia. Laboris ullamco laboris labore laborum cupidatat laborum officia sint amet pariatur.'
    });

    blog.save().then(result => res.send(result)).catch(err => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find().then(result => res.send(result)).catch(err => console.log(err));
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5fdf69e513b5844504ff37e9')
        .then(result => res.send(result)).catch(err => console.log(err));
})

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

//about call
app.get('/about', (req, res) => {
    // res.send('');
    res.render('about', { title: 'About' });
});

//redirect
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
});

//404 requests
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });
})
// app.get('/', (req, res) => {
//     res.send('<p>home page</p>');
// });
