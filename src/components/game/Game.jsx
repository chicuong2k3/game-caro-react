import { useState } from "react";
import Board from "./../board/Board";
import "./game.css";

export default function Game() {
  const noRows = 3;
  const noCols = 3;

  const [history, setHistory] = useState([Array(noRows * noCols).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAsc, setIsAsc] = useState(true);
  const [positionHistory, setPositionHistory] = useState([]);

  function handlePlay(nextSquares, currentSquareIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPositionHistory([...positionHistory, currentSquareIndex]);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;


      const curPosition = positionHistory[move - 1];
      const curY = Math.floor(curPosition / noRows);
      const curX = curPosition - noRows * curY;

      if (!isNaN(curX) && !isNaN(curY)) {
        description += ` (row = ${curY}, col = ${curX})`;
      }
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {(() => {
          if (move !== currentMove) {
            return <button onClick={() => jumpTo(move)}>{description}</button>;
          }
        })()}
      </li>
    );
  });

  const sortedMoves = isAsc ? moves : moves.slice().reverse();

  const curPosition = positionHistory[currentMove - 1];
  const curY = Math.floor(curPosition / noRows);
  const curX = curPosition - noRows * curY;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          noRows={noRows}
          noCols={noCols}
        />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAsc(!isAsc)}>
          {isAsc ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"}
        </button>
        <ul className="moves">{sortedMoves}</ul>
        <div>
          {
            (() => {
              if (!isNaN(curX) && !isNaN(curY)) {
                return `You are at move #${currentMove}` +
                  ` (row = ${curY}, col = ${curX}, player = ${currentSquares[curPosition]})`;
              }
              else {
                return`You are at move #${currentMove}`;
              }
            })()
          }
        </div>
      </div>
    </div>
  );
}
