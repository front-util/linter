const fs = require('node:fs');

function readFileContent(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function processData(data) {
    if(typeof data !== 'string') {
        throw new TypeError('Invalid data type');
    }

    return data.toUpperCase();
}

module.exports = {
    readFileContent,
    processData,
};
