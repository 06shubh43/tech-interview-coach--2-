import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Loader2,
  RotateCcw,
  Send,
  Award,
  Copy,
  Check,
} from 'lucide-react';
import {
  SubjectId,
  InterviewDifficulty,
  InterviewTurn,
  InterviewEvaluation,
} from '../types';
import { SUBJECTS } from '../data/knowledgeBase';
import { fetchInterviewQuestion, evaluateCandidateAnswer } from '../services/coachService';

interface InterviewModeViewProps {
  activeSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  onRecordEvaluation: (subject: SubjectId, score: number, question: string) => void;
}

const DIFFICULTIES: InterviewDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const InterviewModeView: React.FC<InterviewModeViewProps> = ({
  activeSubject,
  onSelectSubject,
  onRecordEvaluation,
}) => {
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Intermediate');
  const [currentTurn, setCurrentTurn] = useState<InterviewTurn | null>(null);
  const [completedTurns, setCompletedTurns] = useState<InterviewTurn[]>([]);
  const [candidateInput, setCandidateInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [copiedIdeal, setCopiedIdeal] = useState(false);

  const loadNewQuestion = async (
    subj: SubjectId,
    diff: InterviewDifficulty,
    qNum: number,
    prevQuestions: string[]
  ) => {
    setIsLoadingQuestion(true);
    setShowHint(false);
    setCandidateInput('');
    try {
      const turn = await fetchInterviewQuestion(subj, diff, qNum, prevQuestions);
      setCurrentTurn(turn);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  useEffect(() => {
    const prevQs = completedTurns.map((t) => t.question);
    loadNewQuestion(activeSubject, difficulty, completedTurns.length + 1, prevQs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubject, difficulty]);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTurn || !candidateInput.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const evaluation: InterviewEvaluation = await evaluateCandidateAnswer(
        currentTurn,
        candidateInput.trim()
      );
      const updatedTurn: InterviewTurn = {
        ...currentTurn,
        userAnswer: candidateInput.trim(),
        evaluation,
      };
      setCurrentTurn(updatedTurn);
      setCompletedTurns((prev) => [updatedTurn, ...prev]);
      onRecordEvaluation(currentTurn.subject, evaluation.score, currentTurn.question);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    const prevQs = completedTurns.map((t) => t.question);
    if (currentTurn && !prevQs.includes(currentTurn.question)) {
      prevQs.push(currentTurn.question);
    }
    loadNewQuestion(activeSubject, difficulty, completedTurns.length + 1, prevQs);
  };

  const handleResetSession = () => {
    setCompletedTurns([]);
    loadNewQuestion(activeSubject, difficulty, 1, []);
  };

  const handleCopyImproved = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdeal(true);
      setTimeout(() => setCopiedIdeal(false), 1800);
    } catch {
      // Ignore
    }
  };

  const sessionAverage =
    completedTurns.length > 0
      ? (
          completedTurns.reduce((sum, t) => sum + (t.evaluation?.score || 0), 0) /
          completedTurns.length
        ).toFixed(1)
      : null;

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header & Configuration Card */}
        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
                <span>1-on-1 Live Simulation</span>
                <span aria-hidden="true">·</span>
                <span>One Question at a Time</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Interview Mode
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Practice real interview questions and improve your technical communication.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {sessionAverage && (
                <div className="text-right pr-3 border-r border-slate-800">
                  <div className="text-xs text-slate-400">Session Avg</div>
                  <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                    {sessionAverage} / 10
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={handleResetSession}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Session</span>
              </button>
            </div>
          </div>

          {/* Difficulty & Category Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Difficulty Level
              </label>
              <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800 w-full sm:w-auto">
                {DIFFICULTIES.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      difficulty === level
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Interview Category
              </label>
              <select
                value={activeSubject}
                onChange={(e) => onSelectSubject(e.target.value as SubjectId)}
                aria-label="Interview Category"
                className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortLabel} — {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Interview Question Stage */}
        {isLoadingQuestion || !currentTurn ? (
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-8 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-7 h-7 text-sky-400 animate-spin" />
            <div className="text-sm font-medium text-slate-200">
              Preparing Question #{completedTurns.length + 1} for {activeSubject} ({difficulty})...
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6 space-y-5">
            {/* Question Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 tabular-nums">
                <span className="font-semibold text-sky-400">
                  Question #{currentTurn.questionNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentTurn.subject}</span>
                <span aria-hidden="true">·</span>
                <span>{currentTurn.difficulty} Level</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Skip Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* The Interviewer's Question */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                AI Technical Interviewer:
              </div>
              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                &ldquo;{currentTurn.question}&rdquo;
              </p>
            </div>

            {/* Optional Hint Box */}
            {showHint && (
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 leading-relaxed">
                <strong className="font-semibold">Interviewer Hint: </strong>
                {currentTurn.hint}
              </div>
            )}

            {/* Answer Form (if not yet evaluated) */}
            {!currentTurn.evaluation ? (
              <form onSubmit={handleEvaluate} className="space-y-3 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your Interview Answer
                </label>
                <textarea
                  rows={5}
                  value={candidateInput}
                  onChange={(e) => setCandidateInput(e.target.value)}
                  disabled={isEvaluating}
                  placeholder="Type your response as you would explain it in a technical interview (cover the definition, how it works internally, an example, and time/space trade-offs)..."
                  className="w-full rounded-lg bg-slate-900 border border-slate-700/80 focus:border-sky-500 focus:outline-none p-3.5 text-sm sm:text-[15px] text-white placeholder-slate-500 leading-relaxed resize-y"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 tabular-nums">
                    {candidateInput.trim()
                      ? `${candidateInput.trim().split(/\s+/).length} words`
                      : 'Aim for 25–60 words for a structured answer'}
                  </span>
                  <button
                    type="submit"
                    disabled={!candidateInput.trim() || isEvaluating}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                      !candidateInput.trim() || isEvaluating
                        ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                        : 'bg-sky-500 hover:bg-sky-400 text-slate-950 cursor-pointer shadow-sm'
                    }`}
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Evaluating Your Response...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer for Evaluation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Evaluation Breakdown */
              <div className="space-y-5 pt-3 border-t border-slate-800">
                {/* Candidate's Submitted Answer */}
                <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Your Submitted Answer
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{currentTurn.userAnswer}</p>
                </div>

                {/* Score & Verdict Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400">Interviewer Evaluation</div>
                      <div className="text-base font-semibold text-white">
                        Verdict: {currentTurn.evaluation.verdict}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Score</div>
                    <div className="text-xl font-mono font-bold text-emerald-400 tabular-nums">
                      {currentTurn.evaluation.score} / 10
                    </div>
                  </div>
                </div>

                {/* What was correct & What was missing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/80 border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>What Was Correct</span>
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-200">
                      {currentTurn.evaluation.whatWasCorrect.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900/80 border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>What Was Missing / To Improve</span>
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-200">
                      {currentTurn.evaluation.whatWasMissing.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Improved Interview Answer */}
                <div className="p-4 rounded-lg bg-slate-900/90 border border-sky-500/30 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                      Improved Interview Answer (Model Response)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyImproved(currentTurn.evaluation!.improvedAnswer)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedIdeal ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Model Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm sm:text-[15px] text-slate-100 leading-relaxed italic">
                    &ldquo;{currentTurn.evaluation.improvedAnswer}&rdquo;
                  </p>
                </div>

                {/* Ask Next Question Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    <span>Ask Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Completed Questions in Current Interview Session */}
        {completedTurns.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Completed Questions This Session ({completedTurns.length})
            </h3>
            <div className="divide-y divide-slate-800">
              {completedTurns.map((turn) => (
                <div key={turn.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 tabular-nums">
                    <span>
                      Q{turn.questionNumber} · {turn.subject} · {turn.difficulty}
                    </span>
                    <span className="font-mono font-semibold text-emerald-400">
                      Score: {turn.evaluation?.score} / 10 ({turn.evaluation?.verdict})
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-200">{turn.question}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
