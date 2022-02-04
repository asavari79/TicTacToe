makeBestMove() { 
    const move = this.minimax(this.board, "O")
    this.board.updateBoard(move.index + 1, "O")
    }
    minimax(board=this.board, player = "O") { 
    let openSpots = board.availableSpots();
    let moves = [];
    for (let i = 0; i < openSpots.length; i++) { 
    let move = {}
    move.index = openSpots[i]
    if (player === 'O') { 
    board.board[openSpots[i]] = "O"
    let result = this.minimax(board, 'X')
    board.board[openSpots[i]] = null;
    move.score = result.score } else { 
    board.board[openSpots[i]] = "X"
    let result = this.minimax(board, 'O')
    board.board[openSpots[i]] = null;
    move.score = result.score
    }
    board[openSpots[i]] = move.index
    moves.push(move)
    }
    if (board.hasWinner() === 'X') { 
    return {score : -10}
    } else if (board.hasWinner() === 'O') { 
    return {score: 10}
    } else if (openSpots.length === 0) { 
    return {score : 0}
    }
    let bestMove;
    if (player === 'O') { 
    let bestScore = -10000
    for (let i = 0; i < moves.length; i++) { 
    if (moves[i].score > bestScore) { 
    bestScore = moves[i].score
    bestMove = i
    }
    }
    } else { 
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) { 
    if (moves[i].score < bestScore) { 
    bestScore = moves[i].score;
    bestMove = i
    }
    }
    }
    return moves[bestMove]
    }
    }
    module.exports = ComputerPlayer;