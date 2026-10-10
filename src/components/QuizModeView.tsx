import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Loader2,
  Trophy,
} from 'lucide-react';
import { SubjectId, QuizDifficulty, QuizQuestion } from '../types';
import { SUBJECTS } from '../data/knowledgeBase';
import { fetchQuizSet } from '../services/coachService';

interface QuizModeViewProps {
  activeSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  onQuizCompleted: (subject: SubjectId, correctCount: number, totalCount: number) => void;
}

const QUIZ_DIFFICULTIES: QuizDifficulty[] = ['Easy', 'Medium', 'Hard'];
const OPTION_KEYS: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

export const QuizModeView: React.FC<QuizModeViewProps> = ({
  activeSubject,
  onSelectSubject,
  onQuizCompleted,
}) => {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Medium');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startQuiz = async (subj: SubjectId, diff: QuizDifficulty) => {
    setIsLoading(true);
    setIsQuizFinished(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    try {
      const qList = await fetchQuizSet(subj, diff, 5);
      setQuestions(qList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startQuiz(activeSubject, difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubject, difficulty]);

  const currentQuestion = questions[currentIndex];
  const currentSelected = selectedAnswers[currentIndex];

  const correctCount = Object.entries(selectedAnswers).reduce((acc, [idxStr, choice]) => {
    const q = questions[Number(idxStr)];
    return q && q.correctOption === choice ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (currentSelected !== undefined || isQuizFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
      onQuizCompleted(activeSubject, correctCount, questions.length);
    }
  };

  const handleTryAgain = () => {
    startQuiz(activeSubject, difficulty);
  };

  const totalQuestions = questions.length || 5;
  const incorrectCount = totalQuestions - correctCount;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quiz Mode Header & Controls */}
        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
                <span>Multiple-Choice Assessment</span>
                <span aria-hidden="true">·</span>
                <span>Instant Answer Verification</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Quiz Mode
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Test your conceptual mastery across core computer science and software engineering topics.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-xs text-slate-400">Live Score</div>
                <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                  {correctCount} / {totalQuestions}
                </div>
              </div>
              <button
                type="button"
                onClick={handleTryAgain}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Quiz Subject
              </label>
              <select
                value={activeSubject}
                onChange={(e) => onSelectSubject(e.target.value as SubjectId)}
                aria-label="Quiz Subject"
                className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortLabel} — {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Difficulty
              </label>
              <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800 w-full sm:w-auto">
                {QUIZ_DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      difficulty === diff
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-8 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-7 h-7 text-sky-400 animate-spin" />
            <div className="text-sm font-medium text-slate-200">
              Generating {difficulty} {activeSubject} quiz questions...
            </div>
          </div>
        ) : isQuizFinished ? (
          /* Quiz Completed Summary View */
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-2 pb-6 border-b border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-1">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                {activeSubject} · {difficulty} Difficulty
              </div>
              <h3 className="text-2xl font-bold text-white">Quiz Completed</h3>
              <p className="text-sm text-slate-400 max-w-md">
                Review your score breakdown and question explanations below.
              </p>
            </div>

            {/* Required Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Score</div>
                <div className="text-2xl font-mono font-bold text-white tabular-nums">
                  {correctCount} / {totalQuestions}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Percentage</div>
                <div className="text-2xl font-mono font-bold text-sky-400 tabular-nums">
                  {percentage}%
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Correct Answers</div>
                <div className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
                  {correctCount}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Incorrect Answers</div>
                <div className="text-2xl font-mono font-bold text-rose-400 tabular-nums">
                  {incorrectCount}
                </div>
              </div>
            </div>

            {/* Question Review List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Answer Key &amp; Review
              </h4>
              <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 bg-slate-900/50">
                {questions.map((q, idx) => {
                  const userPick = selectedAnswers[idx];
                  const isCorrect = userPick === q.correctOption;
                  return (
                    <div key={q.id} className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-slate-400 tabular-nums">
                          Question {idx + 1}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Correct ({userPick})</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>
                                Your Answer: {userPick} · Correct: {q.correctOption}
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">{q.question}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-slate-200">Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleTryAgain}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          /* Active Question Card */
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6 space-y-5">
            {/* Progress Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 tabular-nums">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>
                  {currentQuestion.subject} · {currentQuestion.difficulty}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-200"
                  style={{
                    width: `${((currentIndex + 1) / Math.max(1, questions.length)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options A, B, C, D */}
            <div className="space-y-2.5">
              {OPTION_KEYS.map((letter) => {
                const optionText = currentQuestion.options[letter];
                const isSelected = currentSelected === letter;
                const isCorrectOption = currentQuestion.correctOption === letter;
                const hasAnswered = currentSelected !== undefined;

                let borderAndBg =
                  'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-200';
                if (hasAnswered) {
                  if (isCorrectOption) {
                    borderAndBg =
                      'bg-emerald-500/15 border-emerald-500/60 text-emerald-100';
                  } else if (isSelected && !isCorrectOption) {
                    borderAndBg = 'bg-rose-500/15 border-rose-500/60 text-rose-100';
                  } else {
                    borderAndBg = 'bg-slate-900/40 border-slate-800/60 text-slate-500';
                  }
                }

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleSelectOption(letter)}
                    disabled={hasAnswered}
                    className={`w-full flex items-center justify-between gap-3 p-4 rounded-lg border text-left transition-colors ${borderAndBg} ${
                      hasAnswered ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-bold shrink-0 mt-0.5 ${
                          hasAnswered && isCorrectOption
                            ? 'bg-emerald-500 text-slate-950'
                            : hasAnswered && isSelected && !isCorrectOption
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm sm:text-[15px] leading-relaxed">{optionText}</span>
                    </div>

                    {hasAnswered && isCorrectOption && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 shrink-0 whitespace-nowrap">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct</span>
                      </span>
                    )}
                    {hasAnswered && isSelected && !isCorrectOption && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 shrink-0 whitespace-nowrap">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Explanation */}
            {currentSelected !== undefined && (
              <div className="space-y-4 pt-2">
                <div
                  className={`p-4 rounded-lg border ${
                    currentSelected === currentQuestion.correctOption
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    {currentSelected === currentQuestion.correctOption ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Correct Answer! (Option {currentQuestion.correctOption})
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        Incorrect — Correct Answer is Option {currentQuestion.correctOption}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    <strong className="font-semibold text-white">Explanation: </strong>
                    {currentQuestion.explanation}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    <span>
                      {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
