import "./board.css";
import Square from "./../square/Square";
import { useState } from "react";

export default function Board({ xIsNext, squares, onPlay, noRows, noCols }) {

  
  const [noSteps, setNoSteps] = useState(0);


  function handleClick(i) {
    setNoSteps(noSteps + 1);
   

    const { winner, winningLine } = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const { winner, winningLine } = calculateWinner(squares);
   console.log(noSteps);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (noSteps === 9) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {(() => {
        const rows = [];
        for (let i = 0; i < noRows; i++) {
          const squaresInARow = [];
          for (let j = 0; j < noCols; j++) {
            squaresInARow.push(
              <Square 
                value={squares[i * noCols + j]}
                onSquareClick={() => handleClick(i * noCols + j)}
                isWinningSquare={
                  winningLine && winningLine.includes(i * noCols + j)
                }
              />
            );
          }
          rows.push(
            <div className="board-row">
              {squaresInARow}
            </div>
          );
        }

        return rows;
      })()}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  return { winner: null, winningLine: null };
}
