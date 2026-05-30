import { CheckCircle2 } from "lucide-react"

export function KeyConceptsList({ concepts }) {
  return (
    <ul className="space-y-3">
      {concepts.map((concept, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {concept}
          </span>
        </li>
      ))}
    </ul>
  )
}
