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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    let socksIndex = {};
    let sockPairsCount = 0;

    for(let i = 0; i < n; i++) {
        if(socksIndex.hasOwnProperty(ar[i])) {
            socksIndex[ar[i]] += 1;
        } else {
            socksIndex[ar[i]] = 1;
        }
    }

    for(let sock in socksIndex) {
        if(socksIndex[sock] >= 2) {
            sockPairsCount += Math.floor((socksIndex[sock] / 2));
        }
    }

    return sockPairsCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
