const STORAGE_KEY = "lp_quiz_scores"

export function getScores() {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveScore(score) {
  if (typeof window === "undefined") return
  try {
    const scores = getScores()
    const existing = scores[score.topicSlug]
    // keep best score
    if (!existing || score.percentage >= existing.percentage) {
      scores[score.topicSlug] = score
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
    }
  } catch {
    // ignore storage errors
  }
}

export function getTopicScore(slug) {
  const scores = getScores()
  return scores[slug] || null
}

export function clearAllScores() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
