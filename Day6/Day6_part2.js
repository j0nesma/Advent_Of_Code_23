// --- Part Two ---
// As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.

// So, the example from before:

// Time:      7  15   30
// Distance:  9  40  200
// ...now instead means this:

// Time:      71530
// Distance:  940200
// Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!

// How many ways can you beat the record in this one much longer race?
function getValues(string) {
    return string.split(':')[1].split(' ').filter((s) => s !== '').join("");
}

function race(str) {
    console.log(str);
    const time = getValues(str.split("\r\n")[0]);
    const record = getValues(str.split("\r\n")[1]);
    console.log(time);
    console.log(record);
    let result = 1;
    let canBeatRecord = 0;
    // BRUTE FORCE but i missed a day so need to catch up
    for(let pressing = 0; pressing<time; pressing++) {
            const rolling = time - pressing;
            const distance = rolling * pressing;
            if(distance>record) canBeatRecord++;
    }

    //SHOULD REFACTOR AND TRY MATH
    // console.log(Math.floor(record/time));
    // // find the lowest value
    // findLowestValue(record, time, initalGuess);
    result *= canBeatRecord;
    console.log(result);
}

let debug = false
const fs = require('fs');
fs.readFile('testInput.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = false;
    console.log("-----TEST CASE ----")
    race(test);
    console.log("-------------------")
});

fs.readFile('input.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = false;
    console.log("------ACTUAL-------")
    race(test)
    console.log("-------------------")
});
