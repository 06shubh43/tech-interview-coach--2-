import React from 'react';
import { X, Settings, Check } from 'lucide-react';
import { CoachPreferences } from '../types';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: CoachPreferences;
  onUpdatePreferences: (next: CoachPreferences) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
}) => {
  if (!isOpen) return null;

  const languages: CoachPreferences['preferredLanguage'][] = ['Java', 'Python', 'C++', 'C'];
  const depths: CoachPreferences['explanationDepth'][] = ['Concise', 'Balanced', 'Deep Dive'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prefs-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-[#0F172A] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-sky-400" />
            <h2 id="prefs-modal-title" className="text-lg font-bold text-white">
              Coach Preferences &amp; Study Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preferences modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Preferred Coding Language */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Default Programming Language (Coding Mode)
            </label>
            <p className="text-xs text-slate-400 mb-3">
              When you ask a coding question without specifying a language, solutions will default to this language.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() =>
                    onUpdatePreferences({
                      ...preferences,
                      preferredLanguage: lang,
                    })
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    preferences.preferredLanguage === lang
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Depth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Explanation Depth
            </label>
            <div className="grid grid-cols-3 gap-2">
              {depths.map((depth) => (
                <button
                  key={depth}
                  type="button"
                  onClick={() =>
                    onUpdatePreferences({
                      ...preferences,
                      explanationDepth: depth,
                    })
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    preferences.explanationDepth === depth
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {depth}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <div className="text-sm font-medium text-white">Auto-Scroll Chat to New Answers</div>
                <div className="text-xs text-slate-400">
                  Automatically scroll down when the coach generates a new answer
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.autoScrollChat}
                onChange={(e) =>
                  onUpdatePreferences({
                    ...preferences,
                    autoScrollChat: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <div className="text-sm font-medium text-white">
                  Always Highlight Big-O Complexity
                </div>
                <div className="text-xs text-slate-400">
                  Emphasize Time and Space complexity in all algorithmic explanations
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.includeComplexityAlways}
                onChange={(e) =>
                  onUpdatePreferences({
                    ...preferences,
                    includeComplexityAlways: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
