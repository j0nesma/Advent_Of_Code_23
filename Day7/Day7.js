// --- Day 6: Wait For It ---
// The ferry quickly brings you across Island Island. After asking around, you discover that there is indeed normally a large pile of sand somewhere near here, but you don't see anything besides lots of water and the small island where the ferry has docked.

// As you try to figure out what to do next, you notice a poster on a wall near the ferry dock. "Boat races! Open to the public! Grand prize is an all-expenses-paid trip to Desert Island!" That must be where the sand comes from! Best of all, the boat races are starting in just a few minutes.

// You manage to sign up as a competitor in the boat races just in time. The organizer explains that it's not really a traditional race - instead, you will get a fixed amount of time during which your boat has to travel as far as it can, and you win if your boat goes the farthest.

// As part of signing up, you get a sheet of paper (your puzzle input) that lists the time allowed for each race and also the best distance ever recorded in that race. To guarantee you win the grand prize, you need to make sure you go farther in each race than the current record holder.

// The organizer brings you over to the area where the boat races are held. The boats are much smaller than you expected - they're actually toy boats, each with a big button on top. Holding down the button charges the boat, and releasing the button allows the boat to move. Boats move faster if their button was held longer, but time spent holding the button counts against the total race time. You can only hold the button at the start of the race, and boats don't move until the button is released.

// For example:

// Time:      7  15   30
// Distance:  9  40  200
// This document describes three races:

// The first race lasts 7 milliseconds. The record distance in this race is 9 millimeters.
// The second race lasts 15 milliseconds. The record distance in this race is 40 millimeters.
// The third race lasts 30 milliseconds. The record distance in this race is 200 millimeters.
// Your toy boat has a starting speed of zero millimeters per millisecond. For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by one millimeter per millisecond.

// So, because the first race lasts 7 milliseconds, you only have a few options:

// Don't hold the button at all (that is, hold it for 0 milliseconds) at the start of the race. The boat won't move; it will have traveled 0 millimeters by the end of the race.
// Hold the button for 1 millisecond at the start of the race. Then, the boat will travel at a speed of 1 millimeter per millisecond for 6 milliseconds, reaching a total distance traveled of 6 millimeters.
// Hold the button for 2 milliseconds, giving the boat a speed of 2 millimeters per millisecond. It will then get 5 milliseconds to move, reaching a total distance of 10 millimeters.
// Hold the button for 3 milliseconds. After its remaining 4 milliseconds of travel time, the boat will have gone 12 millimeters.
// Hold the button for 4 milliseconds. After its remaining 3 milliseconds of travel time, the boat will have gone 12 millimeters.
// Hold the button for 5 milliseconds, causing the boat to travel a total of 10 millimeters.
// Hold the button for 6 milliseconds, causing the boat to travel a total of 6 millimeters.
// Hold the button for 7 milliseconds. That's the entire duration of the race. You never let go of the button. The boat can't move until you let go of the button. Please make sure you let go of the button so the boat gets to move. 0 millimeters.
// Since the current record for this race is 9 millimeters, there are actually 4 different ways you could win: you could hold the button for 2, 3, 4, or 5 milliseconds at the start of the race.

// In the second race, you could hold the button for at least 4 milliseconds and at most 11 milliseconds and beat the record, a total of 8 different ways to win.

// In the third race, you could hold the button for at least 11 milliseconds and no more than 19 milliseconds and still beat the record, a total of 9 ways you could win.

// To see how much margin of error you have, determine the number of ways you can beat the record in each race; in this example, if you multiply these values together, you get 288 (4 * 8 * 9).

// Determine the number of ways you could beat the record in each race. What do you get if you multiply these numbers together?
function getNumberOfCharacters(char, string) {
    // console.log(string);
    // console.log(char);
    return (string.match(new RegExp(char, 'g')) || []).length
}

function getHandType(hand) {
    let numberForEachChar = [];
    let cHand = hand;
    while (cHand.length > 0) {
        numberForEachChar.push(getNumberOfCharacters(cHand[0], cHand));
        cHand = cHand.replaceAll(cHand[0], '');
    }

    console.log(numberForEachChar.sort((a, b) => b - a));
    // const numberOfChars = getNumberOfCharacters(hand[0], hand);
    switch (numberForEachChar[0]) {
        case 5:
            debug && console.log("Five of a kind");
            return 7
        case 4:
            debug && console.log("Four of a kind");
            return 6
        case 3:
            if (numberForEachChar.length === 2) {
                debug && console.log("Full house");
                return 5
            }
            debug && console.log("Three of a kind");
            return 4;
        case 2:
            if (numberForEachChar[1] === 2) {
                debug && console.log("Two pair");
                return 3;
            }
            debug && console.log("A Pair");
            return 2;
        default:
            debug && console.log("High Card")
            return 1;
    }
}

function convertCardIfRoyal(card) {
    switch(card) {
        case'A':
        return 14;
        case'K':
        return 13;
        case'Q':
        return 12;
        case'J':
            return 11;
        case'T':
            return 10;
        default:
            return card;
    }
}

function camelCards(str) {
    const handAndBid = str.split("\r\n");
    console.log(handAndBid)
    let handInfo = [];
    handAndBid.forEach(element => {
        const hand = element.split(" ")[0];
        const bid = Number.parseInt(element.split(" ")[1]);
        console.log(getHandType(hand));
        let data = {}
        data.hand = hand;
        data.bid = bid;
        data.value = getHandType(hand)
        handInfo.push(data);
    });
    console.log(handInfo);
    handInfo.sort((a,b) => {
        console.log("----")
        console.log(a);
        console.log(b);
        console.log("----")
        if(a.value - b.value === 0) {
            for(let i =0; i<a.hand.length; i++){
                if(a.hand[i] !== b.hand[i]) {
                    const cardA = convertCardIfRoyal(a.hand[i]);
                    const cardB = convertCardIfRoyal(b.hand[i]);
                    return cardA - cardB;
                }
            }
        }
        return a.value-b.value;
    })
    let result = 0;
    console.log(handInfo);
    for(let i=0; i<handInfo.length; i++) {
        result += handInfo[i].bid * (i+1);
    }
    console.log(result);

}

let debug = false
const fs = require('fs');
fs.readFile('testInput.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = true;
    console.log("-----TEST CASE ----")
    camelCards(test);
    console.log("-------------------")
});

fs.readFile('input.txt', async (err, inputD) => {
    if (err) throw err;
    const test = await inputD.toString();
    debug = false;
    console.log("------ACTUAL-------")
    camelCards(test)
    console.log("-------------------")
});