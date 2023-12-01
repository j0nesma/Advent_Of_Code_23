/* Prompt:
I am going to give you a coding challenge provide me a solution for this task in javascript:

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.*/

function calculateCalibrationSum(input) {
    const lines = input.split('\n'); // Split input into lines
    let sum = 0;

    lines.forEach(line => {
        const firstDigit = line.match(/\d/); // Find the first digit
        const lastDigit = line.match(/\d(?=[^\d]*$)/); // Find the last digit

        if (firstDigit && lastDigit) {
            const value = parseInt(firstDigit[0] + lastDigit[0], 10); // Combine into a two-digit number
            sum += value;
        }
    });

    return sum;
}

// Example usage
const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

console.log(calculateCalibrationSum(input))
const fs = require('fs');

fs.readFile('input.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    console.log(calculateCalibrationSum(test));
})