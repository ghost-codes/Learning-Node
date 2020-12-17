const fs = require('fs');

//reading streams

const readStream = fs.createReadStream('./docs/blog3.txt');
readStream.on('data', (chunk) => {
    console.log('---------- New Chunk -----------');
    console.log(chunk);
});