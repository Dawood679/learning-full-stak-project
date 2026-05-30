export function ConceptExplanation({ paragraphs }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          {para}
        </p>
      ))}
    </div>
  )
}
