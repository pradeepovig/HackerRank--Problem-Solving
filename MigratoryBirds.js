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

// Complete the migratoryBirds function below.
function migratoryBirds(arr) {
    let birdsIndex = {};
    let maxFrequency = 1;
    let mostSpottedBirdsIndices = [];

    // Build the index
    arr.forEach(elem => {
        if(birdsIndex.hasOwnProperty(elem)) {
            birdsIndex[elem] += 1;
        } else {
            birdsIndex[elem] = 0;
        }
    });

    // Find max frequency of any spotted bird within index
    for(let bird in birdsIndex) {
        switch(true) {
            // New max frequency found
            case birdsIndex[bird] > maxFrequency:
                mostSpottedBirdsIndices.length = 0;
                mostSpottedBirdsIndices.push(bird);
                maxFrequency = birdsIndex[bird];
                break;
            case birdsIndex[bird] === maxFrequency:
                mostSpottedBirdsIndices.push(bird);
                break;
        }
    }

    return Math.min(...mostSpottedBirdsIndices);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
