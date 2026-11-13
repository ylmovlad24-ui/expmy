const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.resolve('test-stream.css');

console.log('Testing write with stream to:', OUTPUT_FILE);

const writeStream = fs.createWriteStream(OUTPUT_FILE);

writeStream.on('open', function() {
    console.log('✅ Stream opened!');
    writeStream.write('test content');
    writeStream.end(function() {
        console.log('✅ File written successfully!');
    });
});

writeStream.on('error', function(error) {
    console.error('❌ Stream error:', error.message);
});
