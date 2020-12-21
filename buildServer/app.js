const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')

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

//blog Routes
app.use('/blogs', blogRoutes);

//404 requests
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });
})

