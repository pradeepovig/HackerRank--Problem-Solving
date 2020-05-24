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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the pageCount function below.
 */
function pageCount(n, p) {
    let bwdWindow = n % 2 !== 0 ? [n - 1, n] : [n, n+1];
    let fwdWindow = [0, 1];
    let turns = 0;

    // If p is either first, last or second last page, no need to turn
    if( p === 1 || bwdWindow.indexOf(p) !== -1 || p === n ) {
        return 0;
    } else {

        while(fwdWindow.indexOf(p) === -1 && bwdWindow.indexOf(p) === -1) {
            // Iterating backwards
            bwdWindow[1] -= 2;
            bwdWindow[0] -= 2;

            // Iterating forward
            fwdWindow[1] += 2;
            fwdWindow[0] += 2;

            turns += 1;
        }
    }

    return turns;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = parseInt(readLine(), 10);

    let result = pageCount(n, p);

    ws.write(result + "\n");

    ws.end();
}
