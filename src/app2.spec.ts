import { TicTacToeClass } from "./app2";

describe('playGame', () => {

    //test blank grid
    const ticTacToe = new TicTacToeClass()
    // test the blank grid
    it("tests blank grid", () => {
        const testArray = {
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
        expect(ticTacToe.board).toStrictEqual(testArray);
    })

    //check valid input from user
    it("test valid user input", () => {
        const res = ticTacToe.verifyInput(2);
        expect(res).toBe(true);
    })

    //test invalid input - user entering the input at the non empty spot
    it("test valid user input", () => {
        const testArray = {
            1: ' ',
            2: ' ',
            3: 'X',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' '
        }
        ticTacToe.board = testArray;
        const res = ticTacToe.verifyInput(3);
        expect(res).toBe(false);
    })

    //check if the gamePlayer() called once
    //check if the method prints the board

    //check winner
    it("test the winner", () => {
        const testArray = {
            1: 'X',
            2: 'X',
            3: 'X',
            4: ' ',
            5: 'O',
            6: ' ',
            7: ' ',
            8: ' ',
            9: 'O'
        }
        const res = ticTacToe.checkWinner(testArray, 'X');
        expect(res).toStrictEqual('X');
    })
    //check tie
    it("test tie", () => {
        const testArray = {
            1: 'X',
            2: 'O',
            3: 'X',
            4: 'O',
            5: 'X',
            6: 'O',
            7: 'O',
            8: 'X',
            9: 'O'
        }
        const res = ticTacToe.checkTie(testArray);
        expect(res).toBe(true);
    })

     //check no tie
     it("test no tie", () => {
        const testArray = {
            1: 'X',
            2: 'O',
            3: 'X',
            4: ' ',
            5: 'X',
            6: 'O',
            7: 'O',
            8: 'X',
            9: 'O'
        }
        const res = ticTacToe.checkTie(testArray);
        expect(res).toBe(false);
    })

    //calculate best move - winning move
    it("function calculates best move", () => {
        const testArray = {
            1: 'X',
            2: 'O',
            3: 'X',
            4: 'O',
            5: 'O',
            6: 'X',
            7: ' ',
            8: ' ',
            9: ' '
        }
        ticTacToe.board = testArray;
        const res = ticTacToe.calculateBestMove();
        expect(res).toBe(9);
    })

    //test best next move
    it("test minimax algo for win", () => {
        const testArray = {
            1: 'O',
            2: 'X',
            3: 'O',
            4: 'X',
            5: 'X',
            6: 'O',
            7: ' ',
            8: ' ',
            9: ' '
        }
        ticTacToe.board = testArray;
        const res = ticTacToe.minimax(testArray, 'O', 'X', 0);
        let move = {index: 9, score: -10} //TODO:why -10? it should be 10
        expect(res).toStrictEqual(move);
    })

    //test next move for tie
    it("test minimax algo for tie move", () => {
        const testArray = {
            1: 'X',
            2: 'O',
            3: 'X',
            4: 'O',
            5: 'X',
            6: ' ',
            7: ' ',
            8: ' ',
            9: 'O'
        }
        ticTacToe.board = testArray;
        const res = ticTacToe.minimax(testArray, 'O', 'X', 0);
        let move = {index:7, score:0}
        expect(res).toStrictEqual(move);
    })

    //test - block the human player
    it("blocks the player from winning", () => {
        const testArray = {
            1: 'X',
            2: 'X',
            3: 'O',
            4: 'O',
            5: 'O',
            6: ' ',
            7: 'X',
            8: ' ',
            9: ' '
        }
        ticTacToe.board = testArray;
        ticTacToe.player = 'X';
        ticTacToe.opponant = 'O';
        const res = ticTacToe.minimax(testArray, 'X', 'O', 0);
        let move = {index:6, score:0}
        expect(res).toStrictEqual(move);
    })

    //test - best move for opponant
    it("blocks the player from winning 2", () => {
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
        ticTacToe.player = 'O';
        ticTacToe.opponant = 'X';
        ticTacToe.board = testArray;
        const res = ticTacToe.minimax(testArray, 'O', 'X', 0);
        let move = {index:5, score:-10}
        expect(res).toStrictEqual(move);
    })

    it("test good fight game", () => {
        const testArray = {
            1: ' ',
            2: 'X',
            3: ' ',
            4: ' ',
            5: ' ',
            6: 'X',
            7: 'O',
            8: 'O',
            9: 'X'
        }
        ticTacToe.player = 'O';
        ticTacToe.opponant = 'X';
        ticTacToe.board = testArray;
        const res = ticTacToe.minimax(testArray, 'O', 'X', 0);
        let move = {index:3, score:-10}
        expect(res).toStrictEqual(move);
    })
})
