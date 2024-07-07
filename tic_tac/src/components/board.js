import { useState } from "react";
import Player from "./player";
import GameBoard from "./GAmeBoard";
import Log from "./log";
import GameOver from "./Gameover";
import { WINNING_COMBINATIONS } from "../winning-combination";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveActivePlayer(gameTurns){
    let currentPlayer='X';
    
    if(gameTurns.length > 0 && gameTurns[0].Player === 'X') {
        currentPlayer = 'O';
    }
   return currentPlayer; 
}

function Board() {
    const [player, setPlayer] = useState({
        X: 'Player 1',
        O: 'Player 2'
    });

    const [gameTurns, setGameTurns] = useState([]);
    
    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array=> [...array])];
    
    for(const turn of gameTurns){
        const {square , Player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = Player;

    }
   
    let winner;
    for (const combination of WINNING_COMBINATIONS){
        const firstSquar=gameBoard[combination[0].row][combination[0].col];
        const secondSquare=gameBoard[combination[1].row][combination[1].col];
        const thirdSquare=gameBoard[combination[2].row][combination[2].col];

        if(firstSquar && firstSquar === secondSquare && firstSquar === thirdSquare){
            winner= player[firstSquar];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;
    
    function handleselectSquare(rowIndex, ColIndex) {
        // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevTurns) =>{
            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns= [
                { square: {row: rowIndex, col: ColIndex} , Player: currentPlayer},
                 ...prevTurns
            ];

           return updatedTurns; 
        });
    }
    function handleRestart(){
        setGameTurns([]);
    }

    function handlePlayerNames(symbol , newName){
        setPlayer(prevPlayers =>{
            return {
                ...prevPlayers,
                [symbol]:newName
            };
        });
    }


    return (
        <div>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                   <Player initialName="Player 1" symbol="X" IsActive={activePlayer === 'X'} onChangeName={handlePlayerNames} />
                   <Player initialName="Player 2" symbol="O" IsActive={activePlayer === 'O'} onChangeName={handlePlayerNames} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
                <GameBoard onSelectSquare={handleselectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </div>
    )
}

export default Board;