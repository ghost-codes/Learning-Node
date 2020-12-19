const express = require("express");

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
app.set('views', './buildServer/views');


//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.render('index', { title: 'Home' });
});

//about call
app.get('/about', (req, res) => {
    // res.send('');
    res.render('about', { title: 'About' });
});

//redirect
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

//404 requests
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });
})
// app.get('/', (req, res) => {
//     res.send('<p>home page</p>');
// });
