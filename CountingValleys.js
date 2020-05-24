'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countingValleys function below.
function countingValleys(n, s) {
    let steps = s.split('');

    // If +ve, we're on mountain, else we are in a valley
    let levelCounter = 0;
    let valleysCounter = 0;
    let inValley = false;

    steps.forEach((step, index, array) => {
        if(step === 'U') {
            levelCounter += 1;
        } else {
            levelCounter -= 1;
        }

        if(levelCounter < 0 && !inValley) {
            valleysCounter += 1;
            inValley = true;
        } else if(levelCounter === 0 && inValley) {
            inValley = false;
        }
    });

    return valleysCounter;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");

    ws.end();
}
