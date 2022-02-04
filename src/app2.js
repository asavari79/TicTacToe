"use strict";
exports.__esModule = true;
exports.TicTacToeClass = void 0;
var TicTacToeClass = /** @class */ (function () {
    function TicTacToeClass() {
        var _this = this;
        this.printBoard = function () {
            console.log('\n' +
                ' ' + _this.board[1] + ' | ' + _this.board[2] + ' | ' + _this.board[3] + '\n' +
                ' ---------\n' +
                ' ' + _this.board[4] + ' | ' + _this.board[5] + ' | ' + _this.board[6] + '\n' +
                ' ---------\n' +
                ' ' + _this.board[7] + ' | ' + _this.board[8] + ' | ' + _this.board[9] + '\n');
        };
        this.verifyInput = function (entry) {
            if (isNaN(entry)) {
                return false;
            }
            else if (_this.board[entry] != ' ') {
                return false;
            }
            else if (entry < 1 || entry > 9) {
                return false;
            }
            return true;
        };
        this.playGame = function () {
            var continuePlay = false;
            for (var i = 1; i < 10; i++) {
                if (_this.board[i] === ' ') {
                    continuePlay = true;
                }
            }
            if (continuePlay) {
                if (_this.player === 'X') {
                    // this.rl.question("Enter board position: ", function (position: number) {
                    //     continuePlay = validate(position)
                    //     if(continuePlay) {
                    //         callGamePlayer(position) //Note: losing the context of 'this' inside rl() -> cannot call this.gamePlayer() directly
                    //     } else {
                    //         console.log("Invalid entry. Please try again.")
                    //         callPlayGame();
                    //     }
                    // })
                    var pos = _this.calculateBestMove();
                    _this.gamePlayer(pos);
                }
                else { // AI player's turn
                    var position = _this.calculateBestMove();
                    _this.gamePlayer(position);
                }
            }
            var validate = function (p) {
                return _this.verifyInput(p);
            };
            var callGamePlayer = function (position) {
                _this.gamePlayer(position);
            };
            var callPlayGame = function () {
                _this.playGame();
            };
        };
        this.gamePlayer = function (position) {
            //update board with new input
            _this.board[position] = _this.player;
            console.log('\n');
            _this.printBoard();
            //check winner
            var hasWon = _this.checkWinner(_this.board, _this.player);
            if (hasWon != ' ') {
                console.log("Winner is: " + hasWon);
                process.exit(0);
            }
            //check tie
            var gameTied = _this.checkTie(_this.board);
            if (gameTied) {
                console.log("It's a Tie!");
                process.exit(0);
            }
            //switch the player
            if (_this.player === 'X') { //human player   
                _this.player = 'O';
                _this.opponant = 'X';
            }
            else if (_this.player === 'O') {
                _this.player = 'X';
                _this.opponant = 'O';
            }
            //continue game
            _this.playGame();
        };
        this.calculateBestMove = function () {
            var bestMove = _this.minimax(_this.board, _this.player, _this.opponant, 0); //this.minimax(this.board, 'O');
            return bestMove.index;
        };
        //original function: Minimax
        // minimax = (newBoard, player) => {
        //     //available spots
        //     let availableSpots = this.emptySpots(newBoard);
        //     //check for the terminal states - win, lose or tie
        //     if(this.checkWinner(newBoard, 'X') == 'X') {  // human player wins
        //         return {score:-10}
        //     } else if(this.checkWinner(newBoard, 'O') == 'O') { // AIPlayer
        //         return {score:10}
        //     } else if(this.checkTie(newBoard)) {
        //         return {score:0};
        //     }
        //     //array to collect all the scores of available empty spots
        //     let moves = []
        //     for(let i = 0; i < availableSpots.length ; i++) {
        //         let move = {
        //             index: -1,
        //             score:-1
        //         }
        //         move.index = availableSpots[i]; //get empty spot index
        //         //set the empty spot to current player
        //         newBoard[availableSpots[i]] = player;
        //         //get the score by calling minimax with opponent player
        //         if(player == 'O') {
        //             let result = this.minimax(newBoard, 'X'); //humanPlayer
        //             move.score = result.score;
        //         } else {
        //             let result = this.minimax(newBoard, 'O'); //aiPlayer
        //             move.score = result.score;
        //         }
        //         //reset the spot to empty value
        //         newBoard[availableSpots[i]] = ' '
        //         //push move object to the array
        //         moves.push(move);
        //     }
        //     //if computer's turn loop over the moves to choose the move with highest score
        //     let bestMove;
        //     if(player == 'O') {
        //         let bestScore = -10000;
        //         for(let i = 0; i < moves.length; i++) {
        //             if(moves[i].score > bestScore) {
        //                 bestScore = moves[i].score;
        //                 bestMove = i;
        //             }
        //         }
        //     } else {
        //         // loop over to find the move with lowest score
        //         let bestScore = 10000;
        //         for(let i = 0; i< moves.length; i++) {
        //             if(moves[i].score < bestScore) {
        //                 bestScore = moves[i].score;
        //                 bestMove = i;
        //             }
        //         }
        //     }
        //     //return bestMove
        //     return moves[bestMove];
        // }
        this.minimax = function (newBoard, player, opponant, depth) {
            //get empty spots array
            var availableSpots = _this.emptySpots(newBoard);
            if (depth == 0) {
                _this.currentPlayer = _this.player;
                _this.currentOpponant = _this.opponant;
            }
            //check for the terminal state
            if (_this.checkWinner(newBoard, _this.currentOpponant) == _this.currentOpponant) {
                return { score: -10 };
            }
            else if (_this.checkWinner(newBoard, _this.currentPlayer) == _this.currentPlayer) { // AIPlayer
                return { score: 10 };
            }
            else if (_this.checkTie(newBoard)) {
                return { score: 0 };
            }
            var moves = [];
            for (var i = 0; i < availableSpots.length; i++) {
                var move = {
                    index: -1,
                    score: -1
                };
                move.index = availableSpots[i];
                newBoard[availableSpots[i]] = player;
                //get move result for opponant and player
                var result = _this.minimax(newBoard, opponant, player, depth + 1);
                move.score = result.score;
                //reset the spot to empty value
                newBoard[availableSpots[i]] = ' ';
                //push move object to the array
                moves.push(move);
            }
            var bestMove;
            if (player == _this.currentPlayer) {
                var bestScore = -10000;
                for (var i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
            else {
                // loop over to find the move with lowest score
                var bestScore = 10000;
                for (var i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
            //return bestMove
            return moves[bestMove];
        };
        //create and return empty spots array
        this.emptySpots = function (board) {
            var emptySpots = [];
            var j = 0;
            for (var i = 0; i < 10; i++) {
                if (_this.board[i] == ' ') {
                    emptySpots[j] = i;
                    j++;
                }
            }
            return emptySpots;
        };
        this.checkWinner = function (board, player) {
            if ((board[1] == player && board[2] == player && board[3] == player) || //row winner
                (board[4] == player && board[5] == player && board[6] == player) ||
                (board[7] == player && board[8] == player && board[9] == player) ||
                (board[1] == player && board[4] == player && board[7] == player) || //col winner
                (board[2] == player && board[5] == player && board[8] == player) ||
                (board[3] == player && board[6] == player && board[9] == player) ||
                (board[1] == player && board[5] == player && board[9] == player) || //diag winner
                (board[3] == player && board[5] == player && board[7] == player)) {
                return player;
            }
            else {
                return ' ';
            }
        };
        this.checkTie = function (board) {
            for (var i = 1; i < 10; i++) {
                if (board[i] == ' ') {
                    return false;
                }
            }
            return true;
        };
        this.board = {
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' '
        };
        this.player = 'X';
        this.opponant = 'O';
        this.readline = require("readline");
        this.rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.winningMoves = [];
        this.dummyBoard = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
        console.table(this.dummyBoard);
    }
    TicTacToeClass.prototype.playTicTacToe = function () {
        var _this = this;
        var defaultPlayer = function () {
            console.log("Starting player is a human player: X");
            _this.printBoard();
            _this.playGame();
        };
        defaultPlayer();
    };
    return TicTacToeClass;
}());
exports.TicTacToeClass = TicTacToeClass;
