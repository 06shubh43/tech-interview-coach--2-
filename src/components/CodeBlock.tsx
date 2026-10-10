import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

function highlightLine(line: string): React.ReactNode {
  // Check for full-line comment
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('--') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Split inline comment if present
  const slashCommentIdx = line.indexOf('//');
  if (slashCommentIdx !== -1 && !line.slice(0, slashCommentIdx).includes('"') && !line.slice(0, slashCommentIdx).includes("'")) {
    const codePart = line.slice(0, slashCommentIdx);
    const commentPart = line.slice(slashCommentIdx);
    return (
      <>
        {tokenizeCodePart(codePart)}
        <span className="text-slate-500 italic">{commentPart}</span>
      </>
    );
  }

  const hashCommentIdx = line.indexOf('#');
  if (hashCommentIdx !== -1 && !line.slice(0, hashCommentIdx).includes('"') && !line.slice(0, hashCommentIdx).includes("'")) {
    const codePart = line.slice(0, hashCommentIdx);
    const commentPart = line.slice(hashCommentIdx);
    return (
      <>
        {tokenizeCodePart(codePart)}
        <span className="text-slate-500 italic">{commentPart}</span>
      </>
    );
  }

  return tokenizeCodePart(line);
}

const KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
  'static', 'final', 'void', 'int', 'double', 'float', 'boolean', 'char', 'long',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'new', 'this', 'super', 'null', 'true', 'false', 'import', 'package', 'try', 'catch',
  'finally', 'throw', 'throws', 'def', 'elif', 'in', 'not', 'and', 'or', 'None', 'True',
  'False', 'self', 'from', 'as', 'with', 'yield', 'lambda', 'pass', 'struct', 'const',
  'virtual', 'override', 'nullptr', 'sizeof', 'typedef', 'typename', 'template', 'namespace',
  'using', 'std', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'HAVING', 'ORDER', 'JOIN',
  'LEFT', 'INNER', 'RIGHT', 'OUTER', 'ON', 'CREATE', 'TABLE', 'PRIMARY', 'KEY', 'INT',
  'VARCHAR', 'NOT', 'NULL', 'REFERENCES', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'DELETE',
  'async', 'await', 'function', 'let', 'var', 'export', 'default',
]);

const TYPES = new Set([
  'String', 'Integer', 'Double', 'Boolean', 'Map', 'HashMap', 'List', 'ArrayList',
  'Set', 'HashSet', 'Arrays', 'System', 'Object', 'Employee', 'Developer', 'BankAccount',
  'ReverseArray', 'Solution', 'PalindromeCheck', 'dict', 'list', 'tuple', 'str', 'bool',
  'vector', 'unique_ptr', 'shared_ptr', 'weak_ptr',
]);

function tokenizeCodePart(text: string): React.ReactNode {
  const regex = /(".*?"|'.*?'|\b[A-Za-z_][A-Za-z0-9_]*\b|\b\d+(?:\.\d+)?\b)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return (
        <span key={idx} className="text-emerald-300">
          {part}
        </span>
      );
    }
    if (KEYWORDS.has(part)) {
      return (
        <span key={idx} className="text-sky-400 font-medium">
          {part}
        </span>
      );
    }
    if (TYPES.has(part)) {
      return (
        <span key={idx} className="text-amber-300">
          {part}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(part)) {
      return (
        <span key={idx} className="text-purple-300">
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'code' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  const lines = code.trimEnd().split('\n');

  return (
    <div className="my-3 rounded-lg border border-slate-800 bg-[#090D16] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="uppercase tracking-wider font-medium text-slate-300">{language}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="tabular-nums text-slate-500">{lines.length} lines</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 transition-colors cursor-pointer whitespace-nowrap"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-[13px] leading-relaxed font-mono text-slate-200 tabular-nums">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="table-row hover:bg-slate-800/30">
                <span className="table-cell pr-4 text-right text-slate-600 select-none w-8 text-xs">
                  {i + 1}
                </span>
                <span className="table-cell whitespace-pre">{highlightLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
