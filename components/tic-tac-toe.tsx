"use client"

import { useState } from "react"
import { Square } from "./square"
import { Button } from "@/components/ui/button"
import { RefreshCw, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function TicTacToe() {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [gameStarted, setGameStarted] = useState<boolean>(false)

  const handleClick = (i: number) => {
    // If square is already filled or there's a winner, return early
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    setGameStarted(true)

    // Create a copy of the squares array
    const nextSquares = squares.slice()

    // Set the value of the clicked square
    nextSquares[i] = xIsNext ? "X" : "O"

    // Update state
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setGameStarted(false)
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every((square) => square !== null)

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (isDraw) {
    status = "Game ended in a draw!"
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`mb-6 py-3 px-6 rounded-full font-medium text-center ${
          winner
            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
            : isDraw
              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-white"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {winner ? (
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <span>{status}</span>
          </div>
        ) : (
          status
        )}
      </motion.div>

      <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-lg">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            highlight={winner && winningLine(squares)?.includes(index)}
            isX={value === "X"}
          />
        ))}
      </div>

      <Button
        onClick={resetGame}
        className="px-6 py-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        New Game
      </Button>

      {!gameStarted && (
        <motion.p
          className="mt-6 text-white/80 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click on any square to start the game!
        </motion.p>
      )}
    </div>
  )
}

// Helper function to calculate winner
function calculateWinner(squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as string
    }
  }

  return null
}

// Helper function to get the winning line
function winningLine(squares: Array<string | null>): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]
    }
  }

  return null
}
