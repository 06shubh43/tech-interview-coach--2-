import { useState, useEffect } from 'react';
import {
  BarChart3,
  Settings,
  MessageSquareCode,
  Mic,
  CheckSquare,
} from 'lucide-react';
import {
  AppMode,
  SubjectId,
  ChatMessage,
  UserStats,
  CoachPreferences,
} from './types';
import { SUBJECTS } from './data/knowledgeBase';
import { askTutorQuestion } from './services/coachService';
import { TutorModeView } from './components/TutorModeView';
import { InterviewModeView } from './components/InterviewModeView';
import { QuizModeView } from './components/QuizModeView';
import { StatsModal } from './components/StatsModal';
import { PreferencesModal } from './components/PreferencesModal';

const STATS_STORAGE_KEY = 'tech_interview_coach_stats_v1';
const PREFS_STORAGE_KEY = 'tech_interview_coach_prefs_v1';

function createInitialStats(): UserStats {
  const subjectActivity = {} as UserStats['subjectActivity'];
  for (const s of SUBJECTS) {
    subjectActivity[s.id] = {
      questions: s.id === 'DSA' ? 2 : s.id === 'OOP' ? 1 : 0,
      quizCorrect: s.id === 'DSA' ? 4 : 0,
      quizTotal: s.id === 'DSA' ? 5 : 0,
      interviewCount: s.id === 'Java' ? 1 : 0,
    };
  }

  return {
    tutorQuestionsAsked: 3,
    codingSolutionsGenerated: 1,
    interviewQuestionsEvaluated: 1,
    totalInterviewScore: 8.5,
    quizzesCompleted: 1,
    quizQuestionsAnswered: 5,
    quizCorrectAnswers: 4,
    subjectActivity,
    recentSessions: [
      {
        id: 'seed-1',
        mode: 'Quiz Mode',
        subject: 'DSA',
        summary: 'Completed Data Structures & Algorithms Quiz',
        date: 'Today',
        scoreText: '4/5 (80%)',
      },
      {
        id: 'seed-2',
        mode: 'Interview Mode',
        subject: 'Java',
        summary: 'Evaluated: HashMap internal working & Java 8 treeification',
        date: 'Today',
        scoreText: '8.5/10',
      },
    ],
  };
}

const DEFAULT_PREFERENCES: CoachPreferences = {
  preferredLanguage: 'Java',
  explanationDepth: 'Balanced',
  includeComplexityAlways: true,
  autoScrollChat: true,
};

export default function App() {
  const [activeMode, setActiveMode] = useState<AppMode>('tutor');
  const [activeSubject, setActiveSubject] = useState<SubjectId>('DSA');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore storage error
    }
    return createInitialStats();
  });

  const [preferences, setPreferences] = useState<CoachPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore storage error
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Ignore
    }
  }, [preferences]);

  const handleSendTutorMessage = async (promptText: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: nowTime,
      subject: activeSubject,
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsTutorLoading(true);

    try {
      const historyPayload = updatedHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const structured = await askTutorQuestion(
        promptText,
        activeSubject,
        preferences,
        historyPayload
      );

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content:
          structured.type === 'coding'
            ? `${structured.title}: ${structured.approach}`
            : `${structured.title}: ${structured.definition}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subject: activeSubject,
        structured,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Update stats
      setStats((prev) => {
        const subjStat = prev.subjectActivity[activeSubject] || {
          questions: 0,
          quizCorrect: 0,
          quizTotal: 0,
          interviewCount: 0,
        };
        return {
          ...prev,
          tutorQuestionsAsked: prev.tutorQuestionsAsked + 1,
          codingSolutionsGenerated:
            structured.type === 'coding'
              ? prev.codingSolutionsGenerated + 1
              : prev.codingSolutionsGenerated,
          subjectActivity: {
            ...prev.subjectActivity,
            [activeSubject]: {
              ...subjStat,
              questions: subjStat.questions + 1,
            },
          },
          recentSessions: [
            {
              id: `sess-${Date.now()}`,
              mode: 'Tutor Q&A' as const,
              subject: activeSubject,
              summary: promptText,
              date: nowTime,
              scoreText: structured.type === 'coding' ? structured.language : 'Concept',
            },
            ...prev.recentSessions,
          ].slice(0, 15),
        };
      });
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleRecordInterviewEvaluation = (
    subject: SubjectId,
    score: number,
    question: string
  ) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStats((prev) => {
      const subjStat = prev.subjectActivity[subject] || {
        questions: 0,
        quizCorrect: 0,
        quizTotal: 0,
        interviewCount: 0,
      };
      return {
        ...prev,
        interviewQuestionsEvaluated: prev.interviewQuestionsEvaluated + 1,
        totalInterviewScore: Math.round((prev.totalInterviewScore + score) * 10) / 10,
        subjectActivity: {
          ...prev.subjectActivity,
          [subject]: {
            ...subjStat,
            interviewCount: subjStat.interviewCount + 1,
          },
        },
        recentSessions: [
          {
            id: `int-sess-${Date.now()}`,
            mode: 'Interview Mode' as const,
            subject,
            summary: question,
            date: nowTime,
            scoreText: `${score}/10`,
          },
          ...prev.recentSessions,
        ].slice(0, 15),
      };
    });
  };

  const handleRecordQuizCompleted = (
    subject: SubjectId,
    correctCount: number,
    totalCount: number
  ) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    setStats((prev) => {
      const subjStat = prev.subjectActivity[subject] || {
        questions: 0,
        quizCorrect: 0,
        quizTotal: 0,
        interviewCount: 0,
      };
      return {
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        quizQuestionsAnswered: prev.quizQuestionsAnswered + totalCount,
        quizCorrectAnswers: prev.quizCorrectAnswers + correctCount,
        subjectActivity: {
          ...prev.subjectActivity,
          [subject]: {
            ...subjStat,
            quizCorrect: subjStat.quizCorrect + correctCount,
            quizTotal: subjStat.quizTotal + totalCount,
          },
        },
        recentSessions: [
          {
            id: `quiz-sess-${Date.now()}`,
            mode: 'Quiz Mode' as const,
            subject,
            summary: `Completed ${subject} Multiple-Choice Quiz`,
            date: nowTime,
            scoreText: `${correctCount}/${totalCount} (${pct}%)`,
          },
          ...prev.recentSessions,
        ].slice(0, 15),
      };
    });
  };

  const handleResetStats = () => {
    const fresh = createInitialStats();
    setStats(fresh);
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#0B0F19] text-slate-100 overflow-hidden">
      {/* Top Header (3-Zone Contract: Brand | Mode Navigation | Actions) */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800/90 bg-[#0D1322] shrink-0">
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveMode('tutor');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap"
        >
          Tech Interview Coach
        </a>

        {/* Zone 2: Mode Navigation (Desktop) */}
        <nav
          aria-label="Study Modes"
          className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800"
        >
          <button
            type="button"
            onClick={() => setActiveMode('tutor')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeMode === 'tutor'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Tutor Q&amp;A</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('interview')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeMode === 'interview'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Interview Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('quiz')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeMode === 'quiz'
                ? 'bg-sky-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Quiz Mode</span>
          </button>
        </nav>

        {/* Zone 3: Statistics & Preferences Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStatsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap"
            title="View Progress & Statistics"
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Statistics</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrefsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 transition-colors cursor-pointer whitespace-nowrap"
            title="Study Preferences & Language Settings"
          >
            <Settings className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </header>

      {/* Mobile Mode Navigation Bar */}
      <div className="flex md:hidden items-center gap-1 px-4 py-2 bg-[#0D1322] border-b border-slate-800/80 shrink-0">
        <button
          type="button"
          onClick={() => setActiveMode('tutor')}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeMode === 'tutor'
              ? 'bg-sky-500 text-slate-950'
              : 'text-slate-300 hover:text-white bg-slate-900'
          }`}
        >
          <MessageSquareCode className="w-3.5 h-3.5" />
          <span>Tutor Q&amp;A</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('interview')}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeMode === 'interview'
              ? 'bg-sky-500 text-slate-950'
              : 'text-slate-300 hover:text-white bg-slate-900'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Interview Mode</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('quiz')}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            activeMode === 'quiz'
              ? 'bg-sky-500 text-slate-950'
              : 'text-slate-300 hover:text-white bg-slate-900'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Quiz Mode</span>
        </button>
      </div>

      {/* Horizontally Scrollable Subject Navigation Bar */}
      <div className="border-b border-slate-800/80 bg-[#0F1629] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 shrink-0 whitespace-nowrap">
            Subjects:
          </span>
          {SUBJECTS.map((subj) => {
            const isSelected = activeSubject === subj.id;
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => setActiveSubject(subj.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 font-semibold'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {subj.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area by Mode */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeMode === 'tutor' && (
          <TutorModeView
            activeSubject={activeSubject}
            onSelectSubject={setActiveSubject}
            messages={messages}
            isLoading={isTutorLoading}
            onSendMessage={handleSendTutorMessage}
            onClearChat={() => setMessages([])}
            preferences={preferences}
            onUpdateLanguage={(lang) =>
              setPreferences((prev) => ({ ...prev, preferredLanguage: lang }))
            }
          />
        )}

        {activeMode === 'interview' && (
          <InterviewModeView
            activeSubject={activeSubject}
            onSelectSubject={setActiveSubject}
            onRecordEvaluation={handleRecordInterviewEvaluation}
          />
        )}

        {activeMode === 'quiz' && (
          <QuizModeView
            activeSubject={activeSubject}
            onSelectSubject={setActiveSubject}
            onQuizCompleted={handleRecordQuizCompleted}
          />
        )}
      </main>

      {/* Modals */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
        onSelectSubjectAndClose={(subj) => {
          setActiveSubject(subj);
          setIsStatsOpen(false);
        }}
      />

      <PreferencesModal
        isOpen={isPrefsOpen}
        onClose={() => setIsPrefsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={setPreferences}
      />
    </div>
  );
}
