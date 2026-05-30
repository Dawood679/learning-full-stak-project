"use client"

import { useCallback, useReducer } from "react"
import { saveScore } from "@/lib/quiz-storage"
import { QuizProgressBar } from "./QuizProgressBar"
import { AnswerOption } from "./AnswerOption"
import { ExplanationPanel } from "./ExplanationPanel"
import { ScoreScreen } from "./ScoreScreen"
import { ArrowRight } from "lucide-react"

// State machine
const initialState = (questions) => ({
  phase: "question", // question | answered | complete
  currentIndex: 0,
  selectedAnswer: null,
  answers: [],
  questions,
})

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const question = state.questions[state.currentIndex]
      return {
        ...state,
        phase: "answered",
        selectedAnswer: action.index,
        answers: [...state.answers, action.index],
      }
    }
    case "NEXT_QUESTION": {
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= state.questions.length) {
        return { ...state, phase: "complete" }
      }
      return {
        ...state,
        phase: "question",
        currentIndex: nextIndex,
        selectedAnswer: null,
      }
    }
    case "RETRY": {
      return initialState(state.questions)
    }
    default:
      return state
  }
}

export function QuizContainer({ questions, slug, topicTitle }) {
  const [state, dispatch] = useReducer(reducer, null, () => initialState(questions))

  const handleAnswer = useCallback((index) => {
    dispatch({ type: "SELECT_ANSWER", index })
  }, [])

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" })
  }, [])

  const handleRetry = useCallback(() => {
    dispatch({ type: "RETRY" })
  }, [])

  // When entering complete phase, save score
  if (state.phase === "complete" && state.answers.length > 0) {
    const correct = state.answers.filter((a, i) => a === questions[i].correctAnswer).length
    const percentage = Math.round((correct / questions.length) * 100)

    // Save to localStorage (idempotent)
    saveScore({
      topicSlug: slug,
      score: correct,
      total: questions.length,
      percentage,
      completedAt: new Date().toISOString(),
      answers: state.answers,
    })

    return (
      <div className="max-w-2xl mx-auto">
        <ScoreScreen
          score={correct}
          total={questions.length}
          percentage={percentage}
          slug={slug}
          answers={state.answers}
          questions={questions}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  const currentQuestion = questions[state.currentIndex]
  const isAnswered = state.phase === "answered"
  const isCorrect = isAnswered && state.selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <QuizProgressBar
          current={state.currentIndex + 1}
          total={questions.length}
        />
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-4">
        <p className="text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
          {currentQuestion.questionText}
        </p>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, i) => (
            <AnswerOption
              key={i}
              option={option}
              index={i}
              selected={state.selectedAnswer}
              correct={currentQuestion.correctAnswer}
              answered={isAnswered}
              onClick={handleAnswer}
            />
          ))}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="mt-6">
            <ExplanationPanel
              explanation={currentQuestion.explanation}
              isCorrect={isCorrect}
            />
          </div>
        )}
      </div>

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end animate-fade-in">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 hover:-translate-y-0.5"
          >
            {state.currentIndex + 1 === questions.length ? "See Results" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
