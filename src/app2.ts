import { validateLocaleAndSetLanguage } from "typescript";

export class TicTacToeClass {
    board;
    player;
    readline; rl;
    winningMoves;
    opponant;
    currentPlayer;
    currentOpponant;

    constructor() {
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
        }
        this.player = 'X';
        this.opponant = 'O'
        this.readline = require("readline");
        this.rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.winningMoves = [];
    }
    
    playTicTacToe() {
        const defaultPlayer = () => {
            console.log(`Starting player is a human player: X`);
            this.printBoard();
            this.playGame();
        }
        defaultPlayer();
    }

    printBoard = () => {
        console.log('\n' +
        ' ' + this.board[1] + ' | ' + this.board[2] + ' | ' + this.board[3] + '\n' +
        ' ---------\n' +
        ' ' + this.board[4] + ' | ' + this.board[5] + ' | ' + this.board[6] + '\n' +
        ' ---------\n' +
        ' ' + this.board[7] + ' | ' + this.board[8] + ' | ' + this.board[9] + '\n');
    }

    verifyInput = (entry: number) => {
        if(isNaN(entry)) {
            return false;
        } else if(this.board[entry] != ' ') {
            return false;
        } else if (entry < 1 || entry > 9) {
            return false;
        }

        return true;
    }

    playGame = () => {
        let continuePlay = false;
        for(let i = 1; i < 10; i++) {
            if(this.board[i] === ' ') {
                continuePlay = true;
            }
        }
        if(continuePlay) {
            if(this.player === 'X') {
                // this.rl.question("Enter board position: ", function (position: number) {
                //     continuePlay = validate(position)
                //     if(continuePlay) {
                //         callGamePlayer(position) //Note: losing the context of 'this' inside rl() -> cannot call this.gamePlayer() directly
                //     } else {
                //         console.log("Invalid entry. Please try again.")
                //         callPlayGame();
                //     }
                // })
                let pos = this.calculateBestMove();
                this.gamePlayer(pos);
            } else { // AI player's turn
                let position = this.calculateBestMove();
                this.gamePlayer(position);
            }
        }
        const validate = (p) => {
            return this.verifyInput(p)
        }
        const callGamePlayer = (position) => {
            this.gamePlayer(position)
        }
        const callPlayGame = () => {
            this.playGame();
        }
    }

    gamePlayer = (position) => {
        //update board with new input
        this.board[position] = this.player

        console.log('\n');
        this.printBoard();

        //check winner
        const hasWon = this.checkWinner(this.board, this.player)
        if(hasWon != ' ') {
            console.log("Winner is: " + hasWon);
            process.exit(0);
        }
        
        //check tie
        const gameTied = this.checkTie(this.board);
        if(gameTied) {
            console.log("It's a Tie!")
            process.exit(0);
        }

        //switch the player
        if (this.player === 'X') { //human player   
            this.player = 'O';
            this.opponant = 'X'
        } else if (this.player === 'O') {
            this.player = 'X'
            this.opponant = 'O'
        }
        
        //continue game
        this.playGame();
    }

    calculateBestMove = () => {
        let bestMove =  this.minimax(this.board, this.player, this.opponant, 0);//this.minimax(this.board, 'O');
        return bestMove.index;
    }

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

    minimax = (newBoard, player, opponant, depth) => {
        //get empty spots array
        let availableSpots = this.emptySpots(newBoard);
        
        if(depth == 0) {
            this.currentPlayer = this.player;
            this.currentOpponant = this.opponant;
        }
        //check for the terminal state
        if(this.checkWinner(newBoard, this.currentOpponant) == this.currentOpponant) {
            return {score:-10}
        } else if(this.checkWinner(newBoard, this.currentPlayer) == this.currentPlayer) { // AIPlayer
            return {score:10}
        } else if(this.checkTie(newBoard)) {
            return {score:0};
        }

        let moves = []
        for(let i = 0; i < availableSpots.length; i++) {
            let move = {
                index: -1,
                score: -1
            }
            move.index = availableSpots[i];

            newBoard[availableSpots[i]] = player;

            //get move result for opponant and player
            let result = this.minimax(newBoard, opponant, player, depth+1);
            move.score = result.score;

            //reset the spot to empty value
            newBoard[availableSpots[i]] = ' '

            //push move object to the array
            moves.push(move);
        }

        let bestMove;
        if(player == this.currentPlayer) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if(moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            // loop over to find the move with lowest score
            let bestScore = 10000;
            for(let i = 0; i< moves.length; i++) {
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        //return bestMove
        return moves[bestMove];
    }
    //create and return empty spots array
    emptySpots = (board) => {
        let emptySpots = [];
        let j = 0;
        for(let i = 0; i < 10; i++) {
            if(this.board[i] == ' ') {
                emptySpots[j] = i;
                j++;
            }
        }
        return emptySpots;
    }
    checkWinner = (board, player) => {
        if((board[1] == player && board[2] == player && board[3] == player) ||  //row winner
            (board[4] == player && board[5] == player && board[6] == player) ||
            (board[7] == player && board[8] == player && board[9] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) || //col winner
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[3] == player && board[6] == player && board[9] == player) ||
            (board[1] == player && board[5] == player && board[9] == player) || //diag winner
            (board[3] == player && board[5] == player && board[7] == player)) {
            return player;
        } else {
            return ' ';
        }
    }
    checkTie = (board) => {
        for(let i = 1; i < 10; i++) {
            if(board[i] == ' ') {
                return false;
            }
        }
        return true;
    }
}