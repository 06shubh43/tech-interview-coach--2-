import React from 'react';
import { X, BarChart3, RotateCcw } from 'lucide-react';
import { UserStats, SubjectId } from '../types';
import { SUBJECTS } from '../data/knowledgeBase';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onResetStats: () => void;
  onSelectSubjectAndClose: (subject: SubjectId) => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
  onSelectSubjectAndClose,
}) => {
  if (!isOpen) return null;

  const avgInterviewScore =
    stats.interviewQuestionsEvaluated > 0
      ? (stats.totalInterviewScore / stats.interviewQuestionsEvaluated).toFixed(1)
      : '—';

  const quizAccuracy =
    stats.quizQuestionsAnswered > 0
      ? `${Math.round((stats.quizCorrectAnswers / stats.quizQuestionsAnswered) * 100)}%`
      : '—';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stats-modal-title"
    >
      <div className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-xl border border-slate-800 bg-[#0F172A] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <h2 id="stats-modal-title" className="text-lg font-bold text-white">
              Interview Preparation Statistics &amp; Progress
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetStats}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Stats</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close statistics modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Tutor Q&amp;A Asked</div>
              <div className="text-2xl font-mono font-bold text-white tabular-nums">
                {stats.tutorQuestionsAsked}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                {stats.codingSolutionsGenerated} coding solutions
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Mock Interviews</div>
              <div className="text-2xl font-mono font-bold text-sky-400 tabular-nums">
                {stats.interviewQuestionsEvaluated}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Questions evaluated</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Avg Interview Score</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
                {avgInterviewScore === '—' ? '—' : `${avgInterviewScore}/10`}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Across evaluated answers</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Quiz Accuracy</div>
              <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                {quizAccuracy}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                {stats.quizzesCompleted} quizzes completed
              </div>
            </div>
          </div>

          {/* Subject Mastery Table */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Topic Breakdown Across 13 Subjects
            </h3>
            <div className="rounded-lg border border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                    <th className="py-2.5 px-4 font-semibold">Subject</th>
                    <th className="py-2.5 px-3 font-semibold">Domain</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Q&amp;A Asked</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Interviews</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Quiz Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  {SUBJECTS.map((subj) => {
                    const row = stats.subjectActivity[subj.id] || {
                      questions: 0,
                      quizCorrect: 0,
                      quizTotal: 0,
                      interviewCount: 0,
                    };
                    return (
                      <tr
                        key={subj.id}
                        onClick={() => onSelectSubjectAndClose(subj.id)}
                        className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <td className="py-2.5 px-4 font-medium text-white">
                          {subj.shortLabel}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">{subj.category}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-200 tabular-nums">
                          {row.questions}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sky-400 tabular-nums">
                          {row.interviewCount}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-emerald-400 tabular-nums">
                          {row.quizTotal > 0 ? `${row.quizCorrect}/${row.quizTotal}` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Study Activity */}
          {stats.recentSessions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Recent Study Sessions
              </h3>
              <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 bg-slate-900/60">
                {stats.recentSessions.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-xs sm:text-sm"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                        <span className="text-sky-400 font-medium">{item.mode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.date}</span>
                      </div>
                      <div className="text-slate-200 truncate">{item.summary}</div>
                    </div>
                    {item.scoreText && (
                      <span className="font-mono font-semibold text-emerald-400 tabular-nums shrink-0">
                        {item.scoreText}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
