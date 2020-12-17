const fs = require('fs');

//read files
fs.readFile('./docs/doc1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log('data', data.toString());
});

console.log('last line');


//writing files
fs.writeFile('./docs/doc1.txt', 'hello, world', () => {
    console.log('file was written');
});


//directories
if (!fs.existsSync('./docs/files')) {
    fs.mkdir('./docs/files/', (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder created");
    });
} else {
    fs.rmdir('./docs/files/', (err) => {
        console.log('dir removed');
    });
}

//deleting files
if (fs.existsSync('./docs/deleteMe.txt')) {
    fs.unlink('./docs/deleteMe.txt', (err) => {
        console.log("file deleted");
    });
}
