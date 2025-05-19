"use client"

import { motion } from "framer-motion"

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight?: boolean
  isX?: boolean
}

export function Square({ value, onSquareClick, highlight = false, isX = false }: SquareProps) {
  return (
    <motion.button
      className={`w-20 h-20 flex items-center justify-center text-4xl font-bold rounded-xl transition-all duration-300
        ${
          highlight
            ? "bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800 text-white shadow-lg shadow-green-500/30 dark:shadow-green-800/30"
            : value
              ? isX
                ? "bg-gradient-to-br from-violet-300 to-violet-500 dark:from-violet-600 dark:to-violet-800 text-white shadow-md shadow-violet-500/20 dark:shadow-violet-800/20"
                : "bg-gradient-to-br from-pink-300 to-pink-500 dark:from-pink-600 dark:to-pink-800 text-white shadow-md shadow-pink-500/20 dark:shadow-pink-800/20"
              : "bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-white hover:dark:bg-slate-600"
        }
        border-2 ${value ? "border-white/30" : "border-slate-200/50 dark:border-slate-600/50"}
        focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500`}
      onClick={onSquareClick}
      whileHover={{ scale: value ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  )
}
