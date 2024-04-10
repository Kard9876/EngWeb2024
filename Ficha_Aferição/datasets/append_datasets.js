const fs = require('fs')
const axios = require('axios')

let files = process.argv;

files.splice(0, 2);

// Create async function and execute it because otherwise we can't use top level await
(async function () {
    for (let i = 0; i < files.length; i++) {
        data = fs.readFileSync(files[i]);

        data = JSON.parse(data);

        for (let j = 0; j < data.length; j++) {
            await axios.post('http://localhost:7777/', data[j]);
        }
    }
})()


