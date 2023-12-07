// --- Day 3: Gear Ratios ---
// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

// It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

// "Aaah!"

// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

// The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

// The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine schematic:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

// Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
let debug = false
function getNumbers(lines) {
    //get the index on the lines where there are numbers
    let numberIndex = []
    for (let j = 0; j < lines.length; j++) {
        for (let i = 0; i < lines[j].length; i++) {
            const string = lines[j];
            if (Number.isInteger(+string[i])) {
                let k = 0
                let number = ""
                let index = ""
                while (Number.isInteger(+string[i + k])) {
                    number += string[i + k];
                    index += i + k + ","
                    k++
                }
                //Remove comma 
                index = index.slice(0, -1);
                numberIndex.push({ line: j, value: number, index })
                i = i + k;
            }
        }
    }
    return numberIndex;
}

function isASymbol(char) {
    return !Number.isInteger(+char) && char !== '.';
}

function getSymbols(lines) {
    let symbols = []
    lines.forEach((line, lineIndex) => {
        for (let i = 0; i < line.length; i++) {
            if (isASymbol(line[i])) {
                symbols.push({ line: lineIndex, value: line[i], index: i });
            }
        }
    });
    return symbols;
}

function lineFilter(numberLine, symbolLine) {
    return numberLine - symbolLine >= -1 && numberLine - symbolLine <= 1
}

function indexCheck(index, number) {
    let hasSymbol = false;
    number.index.split(",").forEach((i) => {
        if (+index === +i || +index === +i - 1 || +index === +i + 1) {
            hasSymbol = true
        }
    })
    return hasSymbol;
}

function getValidNumbers(numbers, symbols) {
    let totalvalue = []
    let validNumbers = []
    for(let j = 0; j<numbers.length; j++) {
        const number = numbers[j];
        const lineFilteredSymbols = symbols.filter((symbol) => lineFilter(number.line, symbol.line))
        const indexFilteredSymbols = lineFilteredSymbols.filter((symbol) => {
            let hasSymbol = false;
            number.index.split(",").forEach((i) => {
                if (+symbol.index === +i || +symbol.index === +i - 1 || +symbol.index === +i + 1) {
                    hasSymbol = true
                }
            })
            return hasSymbol;
        })
        if (indexFilteredSymbols.length > 0) {
            indexFilteredSymbols.forEach((symbol) => {
                if (symbol.value === "*") {
                    filterLineNumbers = numbers.filter((n) => lineFilter(n.line, symbol.line) && indexCheck(symbol.index, n));
                    // console.log(filterLineNumbers);
                    if (filterLineNumbers.length === 2) {
                        let arr = []
                        filterLineNumbers.forEach((ele) => arr.push(Number.parseInt(ele.value)));
                        validNumbers.push(arr.reduce((total, x) => total * x));
                        numbers = numbers.filter((val) => {
                            return filterLineNumbers.indexOf(val) == -1;
                        });
                    }
                }
            })
            
        }
    }
    return validNumbers;
}

function theEngine(input) {
    const lines = input.split("\r\n");
    const numbers = getNumbers(lines);
    // debug && console.log(numbers);
    const symbols = getSymbols(lines);
    // debug && console.log(symbols);
    const validNumbers = getValidNumbers(numbers, symbols);
    console.log(validNumbers);
    console.log(validNumbers.reduce((total, x) => +total + +x))
}

const fs = require('fs');
fs.readFile('testInput.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = true;
    console.log("------TEST CASE-------")
    theEngine(test)
    console.log("-------------------")
});

fs.readFile('input.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = false;
    console.log("------ACTUAL-------")
    theEngine(test)
    console.log("-------------------")
});

//  debug && console.log(numberIndex);
// numberIndex.forEach((val) => {
//     valIndex = val.index.split(',');
//     valIndex.forEach((i) => {
//         if(index > 0) {
//             debug && console.log("checking numbers above index:" +  i);
//             checkNumbers(Number.parseInt(i), index-1, lines);
//         }
//         if(index < lines.length) {
//             debug && console.log("checking numbers below index:" + i);
//             checkNumbers(Number.parseInt(i), index+1, lines);
//         }
//     })
// })