import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Code2,
  BookOpen,
  Check,
  Copy,
  ArrowRight,
  RotateCcw,
  Loader2,
  Terminal,
} from 'lucide-react';
import {
  SubjectId,
  ChatMessage,
  CoachPreferences,
  ConceptStructuredResponse,
  CodingStructuredResponse,
} from '../types';
import { SUBJECTS, FEATURED_STARTER_QUESTIONS } from '../data/knowledgeBase';
import { CodeBlock } from './CodeBlock';

interface TutorModeViewProps {
  activeSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (prompt: string) => void;
  onClearChat: () => void;
  preferences: CoachPreferences;
  onUpdateLanguage: (lang: CoachPreferences['preferredLanguage']) => void;
}

export const TutorModeView: React.FC<TutorModeViewProps> = ({
  activeSubject,
  onSelectSubject,
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  preferences,
  onUpdateLanguage,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentSubjectMeta = SUBJECTS.find((s) => s.id === activeSubject) || SUBJECTS[0];

  useEffect(() => {
    if (preferences.autoScrollChat) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, preferences.autoScrollChat]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;
    setInputText('');
    onSendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed || isLoading) return;
      setInputText('');
      onSendMessage(trimmed);
    }
  };

  const handleCopyInterviewAnswer = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  const renderConceptCard = (msgId: string, data: ConceptStructuredResponse) => (
    <div className="space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Concept Guide</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-400 font-medium">{data.subject}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">{data.title}</h3>
      </div>

      {/* 1. Definition */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          01. Definition
        </h4>
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
          {data.definition}
        </p>
      </div>

      {/* 2. Simple Explanation */}
      <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          02. Simple Explanation
        </h4>
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-300">
          {data.simpleExplanation}
        </p>
      </div>

      {/* 3. Example */}
      <div className="space-y-2 pt-2 border-t border-slate-800/60">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          03. Example
        </h4>
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-300 whitespace-pre-line">
          {data.example}
        </p>
        {data.exampleCode && (
          <CodeBlock code={data.exampleCode.code} language={data.exampleCode.language} />
        )}
      </div>

      {/* 4. Interview Answer */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="rounded-lg bg-slate-900/90 border border-sky-500/30 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              04. Interview Answer (Ready to Speak)
            </span>
            <button
              type="button"
              onClick={() => handleCopyInterviewAnswer(msgId, data.interviewAnswer)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {copiedId === msgId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Answer</span>
                </>
              )}
            </button>
          </div>
          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-100 italic">
            {data.interviewAnswer}
          </p>
        </div>
      </div>

      {/* Follow-up Prompts */}
      {data.followUpQuestions && data.followUpQuestions.length > 0 && (
        <div className="pt-2">
          <p className="text-xs text-slate-400 mb-2">Suggested follow-up questions:</p>
          <div className="flex flex-wrap gap-2">
            {data.followUpQuestions.map((fq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSendMessage(fq)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-700/70 transition-colors cursor-pointer text-left"
              >
                <span>{fq}</span>
                <ArrowRight className="w-3 h-3 shrink-0 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCodingCard = (data: CodingStructuredResponse) => (
    <div className="space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Coding Mode Solution</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-mono font-medium">{data.language}</span>
          <span aria-hidden="true">·</span>
          <span>{data.subject}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">{data.title}</h3>
      </div>

      {/* Approach */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Approach
        </h4>
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
          {data.approach}
        </p>
      </div>

      {/* Code */}
      <div className="space-y-1.5 pt-1">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Code ({data.language})
        </h4>
        <CodeBlock code={data.code} language={data.language} />
      </div>

      {/* Important Lines */}
      {data.importantLines && data.importantLines.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Important Lines Breakdown
          </h4>
          <div className="divide-y divide-slate-800/70 rounded-lg border border-slate-800 bg-slate-900/50">
            {data.importantLines.map((item, idx) => (
              <div key={idx} className="p-3 space-y-1">
                <code className="block text-xs font-mono text-sky-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80 overflow-x-auto">
                  {item.lineRef}
                </code>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time & Space Complexity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Time Complexity</div>
          <div className="text-sm font-mono font-medium text-emerald-400 tabular-nums">
            {data.timeComplexity}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Space Complexity</div>
          <div className="text-sm font-mono font-medium text-sky-400 tabular-nums">
            {data.spaceComplexity}
          </div>
        </div>
      </div>

      {/* Interview Tip */}
      <div className="p-3.5 rounded-lg bg-slate-900/90 border border-amber-500/30">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
          Interview Tip
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{data.interviewTip}</p>
      </div>

      {/* Follow-up Prompts */}
      {data.followUpQuestions && data.followUpQuestions.length > 0 && (
        <div className="pt-1">
          <p className="text-xs text-slate-400 mb-2">Follow-up coding &amp; design questions:</p>
          <div className="flex flex-wrap gap-2">
            {data.followUpQuestions.map((fq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSendMessage(fq)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-700/70 transition-colors cursor-pointer text-left"
              >
                <span>{fq}</span>
                <ArrowRight className="w-3 h-3 shrink-0 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Main Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Assistant Card */}
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
                  <span>Technical Interview Coach</span>
                  <span aria-hidden="true">·</span>
                  <span>Tutor Q&amp;A &amp; Coding Mode</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  👋 Hello! I am your Technical Interview Coach.
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-300 mt-1.5 leading-relaxed">
                  I&apos;m here to help you master technical concepts across computer science and software engineering domains.
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={onClearChat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Chat</span>
                </button>
              )}
            </div>

            {/* 3 Domain Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-slate-800/80">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                  Languages
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {['Java', 'Python', 'C/C++'].map((subj) => (
                    <li key={subj}>
                      <button
                        type="button"
                        onClick={() => onSelectSubject(subj as SubjectId)}
                        className={`hover:text-sky-300 transition-colors cursor-pointer ${
                          activeSubject === subj ? 'text-sky-400 font-semibold' : ''
                        }`}
                      >
                        • {subj}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                  Core CS
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    { id: 'DSA', name: 'Data Structures & Algorithms' },
                    { id: 'DBMS', name: 'DBMS & SQL' },
                    { id: 'Computer Networks', name: 'Computer Networks' },
                    { id: 'Operating Systems', name: 'Operating Systems' },
                    { id: 'OOP', name: 'OOP' },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelectSubject(item.id as SubjectId)}
                        className={`hover:text-emerald-300 transition-colors cursor-pointer text-left ${
                          activeSubject === item.id ? 'text-emerald-400 font-semibold' : ''
                        }`}
                      >
                        • {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Modern Tech
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    { id: 'Web Development', name: 'Web Development' },
                    { id: 'AI/ML', name: 'AI & ML' },
                    { id: 'Cloud', name: 'Cloud Computing' },
                    { id: 'Software Engineering', name: 'Software Engineering' },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelectSubject(item.id as SubjectId)}
                        className={`hover:text-amber-300 transition-colors cursor-pointer text-left ${
                          activeSubject === item.id ? 'text-amber-400 font-semibold' : ''
                        }`}
                      >
                        • {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How I answer your interview questions */}
            <div className="mt-4 pt-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                How I answer your interview questions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90">
                  <div className="text-xs font-semibold text-sky-400 mb-0.5">1. Definition</div>
                  <div className="text-xs text-slate-400">Clear and concise technical summary</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90">
                  <div className="text-xs font-semibold text-emerald-400 mb-0.5">
                    2. Simple Explanation
                  </div>
                  <div className="text-xs text-slate-400">Easy student-friendly breakdown</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90">
                  <div className="text-xs font-semibold text-amber-400 mb-0.5">3. Example</div>
                  <div className="text-xs text-slate-400">Real-world example or code snippet</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90">
                  <div className="text-xs font-semibold text-purple-400 mb-0.5">
                    4. Interview Answer
                  </div>
                  <div className="text-xs text-slate-400">Exact answer you can use in an interview</div>
                </div>
              </div>
            </div>

            {/* Active Subject Starter Questions + Featured Questions */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Selected Topic: {currentSubjectMeta.label}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">{currentSubjectMeta.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Concept Questions for Selected Subject */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>Concept Questions ({currentSubjectMeta.shortLabel})</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {currentSubjectMeta.sampleQuestions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onSendMessage(q)}
                        disabled={isLoading}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm text-left text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                      >
                        <span className="truncate">{q}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coding Questions & Popular Interview Prompts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Coding &amp; High-Yield Interview Prompts</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      ...currentSubjectMeta.codingQuestions,
                      ...FEATURED_STARTER_QUESTIONS.map((f) => f.text).filter(
                        (t) => !currentSubjectMeta.sampleQuestions.includes(t)
                      ),
                    ]
                      .slice(0, 4)
                      .map((q, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => onSendMessage(q)}
                          disabled={isLoading}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm text-left text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                        >
                          <span className="truncate">{q}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-500/80 shrink-0" />
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-2xl rounded-xl bg-sky-600 text-white px-4 py-3 shadow-sm">
                  <div className="flex items-center justify-end gap-2 text-[11px] text-sky-100/90 mb-1">
                    <span>You</span>
                    {msg.subject && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{msg.subject}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] leading-relaxed">{msg.content}</p>
                </div>
              ) : (
                <div className="w-full rounded-xl border border-slate-800 bg-[#111827] p-5 sm:p-6 shadow-sm">
                  {msg.structured ? (
                    msg.structured.type === 'coding' ? (
                      renderCodingCard(msg.structured)
                    ) : (
                      renderConceptCard(msg.id, msg.structured)
                    )
                  ) : (
                    <div className="text-sm sm:text-[15px] leading-relaxed text-slate-200 whitespace-pre-line">
                      {msg.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Loading State Indicator */}
          {isLoading && (
            <div className="rounded-xl border border-slate-800 bg-[#111827] p-5 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-sky-400 animate-spin shrink-0" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium text-slate-200">
                  Structuring your technical interview breakdown...
                </div>
                <div className="text-xs text-slate-400">
                  Preparing definition, explanation, code example, and interview-ready response
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Bottom Chat Input Bar */}
      <div className="border-t border-slate-800/90 bg-[#0D1322] px-4 sm:px-6 py-3.5">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Quick Example Pills & Coding Language Switcher */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-slate-400 mr-1 whitespace-nowrap">Quick Ask:</span>
              {[
                'What is OOP?',
                'What is normalization in DBMS?',
                'Explain TCP vs UDP',
                'What is binary search?',
                'What is inheritance in Java?',
                'Explain Python list vs tuple',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => onSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-md text-xs text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {(['Java', 'Python', 'C++', 'C'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onUpdateLanguage(lang)}
                  className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                    preferences.preferredLanguage === lang
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Preferred language for Coding Mode: ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask a technical question (e.g. OOP, SQL)..."
                aria-label="Ask a technical question"
                className="w-full rounded-lg bg-slate-900 border border-slate-700/80 focus:border-sky-500 focus:outline-none px-4 py-2.5 text-sm sm:text-[15px] text-white placeholder-slate-500 disabled:opacity-60 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                !inputText.trim() || isLoading
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 cursor-pointer shadow-sm'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
