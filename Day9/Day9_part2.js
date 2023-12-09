// --- Part Two ---
// Of course, it would be nice to have even more history included in your report. Surely it's safe to just extrapolate backwards as well, right?

// For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the beginning of your sequence of zeroes, then fill in new first values for each previous sequence.

// In particular, here is what the third example history looks like when extrapolating back in time:

// 5  10  13  16  21  30  45
//   5   3   3   5   9  15
//    -2   0   2   4   6
//       2   2   2   2
//         0   0   0
// Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: 5.

// Doing this for the remaining example data above results in previous values of -3 for the first history and 0 for the second history. Adding all three new values together produces 2.

// Analyze your OASIS report again, this time extrapolating the previous value for each history. What is the sum of these extrapolated values?


const fs = require('node:fs');
function OASIS(input) {
    const surroundings = input.split('\r\n').map(ele => ele.split(" ").map(ele => Number.parseInt(ele)));
    const routes = []
    surroundings.forEach(surrounding => {
        const arr = [];
        arr.push(surrounding);
        let count = 0;
        while(!arr[count].every((ele) => ele === 0)) {
            let diff = [];
            for(let i=0; i<arr[count].length - 1; i++) {
                diff.push(arr[count][i + 1] - arr[count][i]);
            }
            arr.push(diff);
            count++;
        }
        routes.push(arr);
    });
    console.log(routes)
    const val = routes.map(route =>{
        route.reverse();
        return(route.reduce((a,b)=> {
            a = Array.isArray(a) ?  a[0] : a
            return b[0] - a;
        }))
    });
    return val.reduce((a,b)=> a + b);
}


const test = fs.readFileSync('testInput.txt', 'utf8');
debug = true;
console.log("-----TEST CASE ----")
console.log(OASIS(test));
console.log("-------------------")

const actual = fs.readFileSync('input.txt', 'utf8');
debug = false;
console.log("------ACTUAL-------")
console.log(OASIS(actual));
console.log("-------------------")