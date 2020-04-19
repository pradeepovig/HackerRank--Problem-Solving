'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the breakingRecords function below.
function breakingRecords(scores) {
    let maxRecordsBroken = 0;
    let maxScore = scores[0];
    let minRecordsBroken = 0;
    let minScore = scores[0];

    scores.forEach((elem, index, arr) => {
        if(elem > maxScore) {
            maxScore = elem;
            maxRecordsBroken++;
        } else {
            if(elem < minScore) {
                minScore = elem;
                minRecordsBroken++;
            }
        }
    });

    return [maxRecordsBroken, minRecordsBroken];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
