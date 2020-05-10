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

// Complete the dayOfProgrammer function below.
const calendar = [
    {
        'month': '01',
        'days': 31
    },
    {
        'month': '02',
        'days': 28
    },
    {
        'month': '03',
        'days': 31
    },
    {
        'month': '04',
        'days': 30
    },
    {
        'month': '05',
        'days': 31
    },
    {
        'month': '06',
        'days': 30
    },
    {
        'month': '07',
        'days': 31
    },
    {
        'month': '08',
        'days': 31
    },
    {
        'month': '09',
        'days': 30
    },
    {
        'month': '10',
        'days': 31
    },
    {
        'month': '11',
        'days': 30
    },
    {
        'month': '12',
        'days': 31
    }
];

function dayOfProgrammer(year) {
    let numOfMonths = 0;
    let numOfDays = 256;

    switch(true) {
        case year < 1918:
            if(year % 4 === 0) {
                calendar[2].days += 1;
            }
            break;
        case year >= 1918:
            if(year % 400 === 0 || ((year % 4) === 0 && (year % 100) !== 0)) {
                calendar[2].days += 1;
            }

            // For 1918, 13 days will be lost due to transition
            if(year === 1918) {
                calendar[2].days -= 13;
            }
            break;
    }

    calendar.forEach(month => {
        if(numOfDays >= month.days) {
            numOfDays -= month.days;
            numOfMonths += 1;
        }
    });

    if(numOfDays < 10) {
        numOfDays = `0${numOfDays}`;
    }

    return `${numOfDays}.${calendar[numOfMonths].month}.${year}`;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
