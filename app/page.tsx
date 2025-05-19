import TicTacToe from "@/components/tic-tac-toe"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-300 via-teal-200 to-emerald-200 dark:from-slate-900 dark:via-teal-900 dark:to-slate-800">
      <div className="max-w-md w-full mx-auto backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 p-8 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-md">Tic-Tac-Toe</h1>
        <TicTacToe />
      </div>
    </main>
  )
}
