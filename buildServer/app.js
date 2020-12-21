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
        console.log("Listening to Port 3000");
    }).catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');
app.set('views', './buildServer/views');


//listen for requests


app.use(express.static('buildServer/public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//about call
app.get('/about', (req, res) => {
    // res.send('');
    res.render('about', { title: 'About' });
});


//blogs route
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: "All Blogs", blogs: result });
        }).catch(err => console.log(err));
});

app.post('/blogs', (req, res) => {

    const blog = new Blog(req.body);
    blog.save().then(
        result => res.redirect('/')
    ).catch(err => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(
        result => res.render('details', { blog: result, title: "Blog Details" })
    ).catch(err => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => console.log(err));
});


//create blogs
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
});

//404 requests
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });
})

