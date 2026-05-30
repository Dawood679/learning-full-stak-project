import { CheckCircle2, XCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export function AnswerOption({ option, index, selected, correct, answered, onClick }) {
  const isSelected = selected === index
  const isCorrect = correct === index
  const isWrong = answered && isSelected && !isCorrect

  return (
    <button
      onClick={() => !answered && onClick(index)}
      disabled={answered}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4",
        !answered && "hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:-translate-y-0.5",
        !answered && "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800",
        answered && isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
        answered && isWrong && "border-red-400 bg-red-50 dark:bg-red-900/20",
        answered && !isSelected && !isCorrect && "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-60",
        "disabled:cursor-default"
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {!answered && (
          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
        )}
        {answered && isCorrect && (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        )}
        {answered && isWrong && (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        {answered && !isSelected && !isCorrect && (
          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
        )}
      </div>

      {/* Letter badge */}
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
        !answered && "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
        answered && isCorrect && "bg-emerald-500 text-white",
        answered && isWrong && "bg-red-500 text-white",
        answered && !isSelected && !isCorrect && "bg-slate-100 dark:bg-slate-700 text-slate-400",
      )}>
        {String.fromCharCode(65 + index)}
      </div>

      {/* Option text */}
      <span className={cn(
        "text-sm font-medium",
        !answered && "text-slate-700 dark:text-slate-200",
        answered && isCorrect && "text-emerald-700 dark:text-emerald-300",
        answered && isWrong && "text-red-700 dark:text-red-300",
        answered && !isSelected && !isCorrect && "text-slate-500 dark:text-slate-400",
      )}>
        {option}
      </span>
    </button>
  )
}
