import { readFile } from 'node:fs/promises';

async function readFileContent(filename) {
    return readFile(filename, 'utf8');
}

function processData(data) {
    if(typeof data !== 'string') {
        throw new TypeError('Invalid data type');
    }

    return data.toUpperCase();
}

export { processData, readFileContent, };
