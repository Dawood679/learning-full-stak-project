export function QuizProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
        Question {current} of {total}
      </span>
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {percentage}%
      </span>
    </div>
  )
}
