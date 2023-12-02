//Attempt #1 failed

// function sumOfFeasibleGameIDs(input) {
//     let games = input.split(';').map(game => game.trim());
//     let feasibleGamesSum = 0;

//     games.forEach(game => {
//         let [gameID, cubeData] = game.split(':');
//         gameID = parseInt(gameID.replace('Game', '').trim());
//         let rounds = cubeData.split(';').map(round => round.trim()); //Undefined Error
//         let isFeasible = true;

//         rounds.forEach(round => {
//             let cubeCounts = { red: 0, green: 0, blue: 0 };
//             round.split(',').forEach(cube => {
//                 let [count, color] = cube.trim().split(' ');
//                 cubeCounts[color] += parseInt(count);
//             });

//             if (cubeCounts.red > 12 || cubeCounts.green > 13 || cubeCounts.blue > 14) {
//                 isFeasible = false;
//             }
//         });

//         if (isFeasible) {
//             feasibleGamesSum += gameID;
//         }
//     });

//     return feasibleGamesSum;
// }

// // Example usage
// const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green; " +
//               "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue; " +
//               "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red; " +
//               "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red; " +
//               "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

// console.log(sumOfFeasibleGameIDs(input));

//Attempt #2 failed
// function sumOfFeasibleGameIDs(input) {
//     let games = input.split('; ').map(game => game.trim());
//     let feasibleGamesSum = 0;

//     games.forEach(game => {
//         let [gameID, ...cubeDataParts] = game.split(': ');
//         gameID = parseInt(gameID.replace('Game', '').trim());
//         let cubeData = cubeDataParts.join(': ');
//         let rounds = cubeData.split('; ').map(round => round.trim());
//         let isFeasible = true;

//         rounds.forEach(round => {
//             let cubeCounts = { red: 0, green: 0, blue: 0 };
//             round.split(', ').forEach(cube => {
//                 let [count, color] = cube.trim().split(' ');
//                 cubeCounts[color] += parseInt(count);
//             });

//             if (cubeCounts.red > 12 || cubeCounts.green > 13 || cubeCounts.blue > 14) {
//                 isFeasible = false;
//             }
//         });

//         if (isFeasible) {
//             feasibleGamesSum += gameID;
//         }
//     });

//     return feasibleGamesSum;
// }

// // Example usage
// const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green; " +
//               "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue; " +
//               "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red; " +
//               "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red; " +
//               "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

// console.log(sumOfFeasibleGameIDs(input)); //Returns 37 incorrect value

// Attempt #3
function sumOfFeasibleGameIDs(input) {
    let games = input.split('; ').map(game => game.trim());
    let feasibleGamesSum = 0;

    games.forEach(game => {
        let [gameID, ...cubeDataParts] = game.split(': ');
        gameID = parseInt(gameID.replace('Game', '').trim());
        let cubeData = cubeDataParts.join(': ');
        let rounds = cubeData.split('; ').map(round => round.trim());
        let isFeasible = true;

        rounds.forEach(round => {
            let cubeCounts = { red: 0, green: 0, blue: 0 };
            round.split(', ').forEach(cube => {
                let [count, color] = cube.trim().split(' ');
                cubeCounts[color] = parseInt(count);
            });

            if (cubeCounts.red > 12 || cubeCounts.green > 13 || cubeCounts.blue > 14) {
                isFeasible = false;
            }
        });

        if (isFeasible) {
            feasibleGamesSum += gameID;
        }
    });

    return feasibleGamesSum;
}

// Example usage
const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green; " +
              "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue; " +
              "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red; " +
              "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red; " +
              "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

console.log(sumOfFeasibleGameIDs(input)); // Response is still 37

//FAILED