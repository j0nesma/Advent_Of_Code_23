// --- Part Two ---
// The sandstorm is upon you and you aren't any closer to escaping the wasteland. You had the camel follow the instructions, but you've barely left your starting position. It's going to take significantly more steps to escape!

// What if the map isn't for people - what if the map is for ghosts? Are ghosts even bound by the laws of spacetime? Only one way to find out.

// After examining the maps a bit longer, your attention is drawn to a curious fact: the number of nodes with names ending in A is equal to the number ending in Z! If you were a ghost, you'd probably just start at every node that ends with A and follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z.

// For example:

// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// Here, there are two starting nodes, 11A and 22A (because they both end with A). As you follow each left/right instruction, use that instruction to simultaneously navigate away from both nodes you're currently on. Repeat this process until all of the nodes you're currently on end with Z. (If only some of the nodes you're on end with Z, they act like any other node and you continue as normal.) In this example, you would proceed as follows:

// Step 0: You are at 11A and 22A.
// Step 1: You choose all of the left paths, leading you to 11B and 22B.
// Step 2: You choose all of the right paths, leading you to 11Z and 22C.
// Step 3: You choose all of the left paths, leading you to 11B and 22Z.
// Step 4: You choose all of the right paths, leading you to 11Z and 22B.
// Step 5: You choose all of the left paths, leading you to 11B and 22C.
// Step 6: You choose all of the right paths, leading you to 11Z and 22Z.
// So, in this example, you end up entirely on nodes that end in Z after 6 steps.

// Simultaneously start on every node that ends with A. How many steps does it take before you're only on nodes that end with Z?

// ------------
// TOTAL TRANSPANCY
// Reddit told me about LCM and I then found out how to make that online using a Chat GPT for support
// Please dont hate me
// ------------
function gcd(a, b) {
    if (b === 0)
        return a;
    return gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
function lowestCommonMultiple(answers) {
    let currentLcm = answers[0];
    for (let i = 1; i < answers.length; i++) {
        currentLcm = lcm(currentLcm, answers[i]);
    }
    return currentLcm;
}


function map(input) {
    const lines = input.split("\r\n");
    const lr = lines[0].trim().split("");
    let camelmap = new Map();

    for (i = 2; i < lines.length; i++) {
        const bits = lines[i].match(/\w{3}/g);
        camelmap.set(bits[0], [bits[1], bits[2]]);
    }
    let startMap = new Map([...camelmap].filter((value) => value[0][2] === 'A'))
    let keys = Array.from(startMap.keys())

    const answers = []
    keys.forEach((location) => {
        let keepGoing = true;
        let answer = 0;
        while (keepGoing) {
            let lor = lr[answer % lr.length];
            const options = camelmap.get(location)
            location = (lor == 'L') ? options[0] : options[1];
            answer++;
            if (location[2] === 'Z') {
                answers.push(answer);
                keepGoing = false;
            }
        }
    })
    return lowestCommonMultiple(answers);
}






const fs = require('node:fs');
const test = fs.readFileSync('testInputP2.txt', 'utf8');
debug = true;
console.log("-----TEST CASE ----")
console.log(map(test));
console.log("-------------------")

const actual = fs.readFileSync('input.txt', 'utf8');
debug = false;
console.log("------ACTUAL-------")
console.log(map(actual));
console.log("-------------------")