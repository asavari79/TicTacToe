//import { TicTacToe } from "./src/app";
import { TicTacToeClass } from "./src/app2";

let message: string = 'Hello world!';
console.log(message);


const ticTacToe = new TicTacToeClass()

const testArray = {
    1: 'O',
    2: ' ',
    3: 'X',
    4: ' ',
    5: ' ',
    6: ' ',
    7: 'X',
    8: ' ',
    9: ' '
}
ticTacToe.board = testArray;
ticTacToe.player = 'O';
ticTacToe.opponant = 'X';
//const res = ticTacToe.minimax(testArray, 'O', 'X', 0);
//console.log("best move: " +res.score + res.index)
//this.board[bestMove.index] = 'O'; // update the board