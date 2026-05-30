import { DIFFICULTY_LABELS } from "@/lib/constants"

export function DifficultyBadge({ difficulty }) {
  const config = DIFFICULTY_LABELS[difficulty] || DIFFICULTY_LABELS.BEGINNER
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}
