"use strict";
exports.__esModule = true;
//import { TicTacToe } from "./src/app";
var app2_1 = require("./src/app2");
var message = 'Hello world!';
console.log(message);
var ticTacToe = new app2_1.TicTacToeClass();
// const testArray = {
//     1: 'X',
//     2: 'X',
//     3: ' ',
//     4: ' ',
//     5: 'O',
//     6: ' ',
//     7: ' ',
//     8: ' ',
//     9: 'O'
// }
// //ticTacToe.checkWinner(testArray, 'X')
// ticTacToe.board = testArray
// let playr = 'X';
// ticTacToe.playGame();
var testArray = {
    1: 'O',
    2: ' ',
    3: 'X',
    4: ' ',
    5: ' ',
    6: ' ',
    7: 'X',
    8: ' ',
    9: ' '
};
ticTacToe.board = testArray;
ticTacToe.player = 'O';
ticTacToe.opponant = 'X';
var res = ticTacToe.minimax(testArray, 'O', 'X', 0);
console.log("best move: " + res.score + res.index);
//this.board[bestMove.index] = 'O'; // update the board
