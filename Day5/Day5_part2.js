// --- Part Two ---
// Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

// The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

// seeds: 79 14 55 13
// This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

// Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

// In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

// Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
function getSeed(alminac, i){
    if(alminac.length === 0) {
        console.log("i = " + i);
        return i;
    }
    const cAlminac = [...alminac]
    const row  = cAlminac.shift().split("\r\n");
    row.shift();
    let noValue = false;
    let newValue = 0;
    row.some(cellRow => {
        const cells = cellRow.split(" ");
        if((+i + +cells[2]) >= (+cells[1]) && (+i + +cells[2]) <= (+cells[1] + +cells[2])){
            console.log("yes");
            newValue = (+i + +cells[2]);
            return;
        }
    })
    console.log(newValue);
    if(newValue <= 0) {
        return -1;
    } else {
        return getSeed(cAlminac, newValue);
    }
}

function getLocation(val, alminac, str) {
    const cAlminac = [...alminac]
    const map = cAlminac.shift().split("\r\n");
    debug && console.log(map);
    let location = val;
    let fullName = map.shift();
    let name = fullName.split("-to-")[1];
    map.forEach(element => {
        const item = element.split(" ");
        debug && console.log("Destination Range Start = " + item[0]);
        debug && console.log("source range start = " + item[1]);
        debug && console.log("range length = " + item[2]);
        debug && console.log("source range end = " + (+item[1] + +item[2]));
        debug && console.log("val = " + val);
        if(+val >= +item[1] && !(+val >= (+item[1] + +item[2]))){
            const diff = +val - +item[1];
            debug && console.log(`${fullName}  ${val} - ${item[1]} diff = ${diff} total = ${ +item[0]+diff}`);
            location = +item[0]+diff;
        }        
    });
    str += `${name} = ${location}, `;
    if(cAlminac.length === 0) {
        debug && console.log(str);
        return location;
    } else {
        return getLocation(location, cAlminac, str);
    }
}
function alminac(input) {
    const alminac = input.split("\r\n\r\n");
    let seeds = alminac.shift().split(": ")[1].split(" ");
    let seedRange = Array.from({ length: (seeds[1]) },(value, index) => Number.parseInt(seeds[0]) + index);
    console.log(alminac.reverse());
    console.log(getSeed(alminac, 46));
    // for(let i=0; i<Number.MAX_SAFE_INTEGER; i++) {
    //     if(getSeed(alminac, i) > 0) {
    //         console.log(getSeed(alminac, i));
    //         break;
    //     }
    // }
    
}


let debug = false
const fs = require('fs');
fs.readFile('testInput.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = true;
    console.log("------TEST CASE-------")
    alminac(test)
    console.log("-------------------")
});

// fs.readFile('input.txt', async (err, inputD) => {
//     if (err) throw err;
//     const test = await inputD.toString();
//     debug = false;
//     console.log("------ACTUAL-------")
//     alminac(test)
//     console.log("-------------------")
// });
