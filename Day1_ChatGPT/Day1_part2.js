/*Prompts (FAILED)
Part 2 

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values? */
/*
function calculateCalibrationSumWithSpelledDigits(input) {
    const lines = input.split('\n'); // Split input into lines
    let sum = 0;

    // Mapping of spelled-out digits to their numeric counterparts
    const digitMap = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    };

    lines.forEach(line => {
        // Replace spelled-out digits with numeric digits
        for (const [word, digit] of Object.entries(digitMap)) {
            line = line.replace(new RegExp(word, 'g'), digit);
        }

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
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

console.log(calculateCalibrationSumWithSpelledDigits(input)); // Output should be 281*/
/*ATTEMPT TWO FAILED*/
// function calculateCalibrationSumWithSpelledDigits(input) {
//     const lines = input.split('\n'); // Split input into lines
//     let sum = 0;

//     // Mapping of spelled-out digits to their numeric counterparts
//     const digitMap = {
//         'one': '1', 'two': '2', 'three': '3', 'four': '4',
//         'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
//     };

//     lines.forEach(line => {
//         // Replace spelled-out digits with numeric digits
//         for (const [word, digit] of Object.entries(digitMap)) {
//             line = line.replace(new RegExp(word, 'g'), digit);
//         }

//         const firstDigit = line.match(/\d/); // Find the first digit
//         const lastDigit = line.match(/\d(?=[^\d]*$)/); // Find the last digit

//         if (firstDigit && lastDigit) {
//             const value = parseInt(firstDigit[0] + lastDigit[0], 10); // Combine into a two-digit number
//             sum += value;
//         }
//     });

//     return sum;
// }

// // Example usage
// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

// console.log(calculateCalibrationSumWithSpelledDigits(input)); // Output should be 281

//FAILED
function calculateCalibrationSumWithSpelledDigits(input) {
    const lines = input.split('\n');
    let sum = 0;

    // Mapping of spelled-out digits to their numeric counterparts
    const digitMap = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    };

    lines.forEach(line => {
        // Replace spelled-out digits with numeric digits
        for (const [word, digit] of Object.entries(digitMap)) {
            line = line.replace(new RegExp(word, 'gi'), digit);
        }

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
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

console.log(calculateCalibrationSumWithSpelledDigits(input)); // Should output 281
