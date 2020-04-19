'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the birthday function below.
function birthday(squares, d, m) {
    let window = [];
    let matchCounter = 0;

    squares.forEach((elem, index, arr) => {
        window.length = 0;

        if(index + m < squares.length) {
            for(let i = 0; i < m; i++) {
                window.push(squares[index]);
                index++;
            }

            let sumWindow = window.reduce((a, b) => a + b, 0);

            if(sumWindow === d) {
                matchCounter++;
            }
        }
    });

    return matchCounter;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const dm = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(dm[0], 10);

    const m = parseInt(dm[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
