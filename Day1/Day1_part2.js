/*--- Part Two ---
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

What is the sum of all of the calibration values?*/
const fs = require('fs');

//Could do with cleaning this up.
function cleanStringToArray(string) {
    const wordNumbers = [{ word: "one", value: "o1e" }, { word: "two", value: "t2o" }, { word: "three", value: "th3ee" }, { word: "four", value: "fo4r" }, { word: "five", value: "f5ve" }, { word: "six", value: "s6x" }, { word: "seven", value: "se7en" }, { word: "eight", value: "ei8ht" }, { word: "nine", value: "n9e" }]
    let arr = string.split('\n');
    let arr2 = arr.map((val) => {
        let containsNumber = []  
        wordNumbers.forEach((number) => {
            let string = val;
            // Need to check for more than one case of the number in the string
            let multiCheck = true;
            while(multiCheck) {
                if(string.includes(number.word)) {
                    containsNumber.push({...number, index:val.indexOf(number.word)})
                    string = string.replace(number.word, "");
                } else {
                    multiCheck = false;
                }
            }
       })
       containsNumber.sort((a, b) => a.index - b.index);
       containsNumber.forEach((number) => {
        val = val.replace(number.word, number.value);
       })
       val = val.replace(/[^\d\n]/g, '');
       return val;
    })
    return arr2.map((input) => getFirstAndLastNumber(input));
}
function getFirstAndLastNumber(number) {
    if (number.length == 2) {
        return number;
    }
    if (number.length == 1) {
        return number + number;
    }
    return number.charAt(0) + '' + number.charAt(number.length - 1);
}


fs.readFile('input.txt', async (err, inputD) => {
    const test = await inputD.toString();
    console.log(cleanStringToArray(test).reduce((total, x) => +total + +x));
});
// console.log(cleanStringToArray(test).map((input) => getFirstAndLastNumber(input)).reduce((total, x) => +total + +x));
// console.log(inputs);
// const output = inputs
// console.log(output);


// fs.readFile('input.txt', async (err, inputD) => {
//     if (err) throw err;
//     const test = await inputD.toString();
//     const inputs = test.replace(regex, '').split(`\n`);
//     const output = inputs.map((input) => getFirstAndLastNumber(input)).reduce((total, x) => +total + +x)
//     console.log(output);
// });
