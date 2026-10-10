import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // 1. Tutor Q&A and Coding Mode Endpoint
  app.post('/api/coach/tutor', async (req, res) => {
    try {
      const {
        prompt,
        subject = 'DSA',
        preferredLanguage = 'Java',
        explanationDepth = 'Balanced',
        history = [],
      } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const ai = getGenAIClient();
      if (!ai) {
        res.status(503).json({ fallback: true, message: 'Using local coach engine' });
        return;
      }

      const recentHistoryText = Array.isArray(history)
        ? history
            .slice(-6)
            .map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n')
        : '';

      const systemInstruction = `You are "Tech Interview Coach", an expert technical interviewer and computer science educator.
Current Subject Focus: ${subject}.
Preferred Programming Language for Code: ${preferredLanguage}.
Explanation Depth: ${explanationDepth}.

Determine whether the user's question is a CODING problem (e.g., asking to write a program, function, implementation, or algorithm code in Java/Python/C/C++/SQL) OR a CONCEPTUAL technical question.

- If it is a CONCEPTUAL question, set responseType = "concept" and provide:
  1. definition: Clear and concise technical definition.
  2. simpleExplanation: Easy student-friendly breakdown with intuition.
  3. example: Real-world example or scenario illustrating the concept.
  4. exampleCodeLanguage & exampleCodeSnippet: A short illustrative code or schema snippet if helpful.
  5. interviewAnswer: Exact, polished 3-4 sentence answer the candidate can speak directly in a real interview.

- If it is a CODING question, set responseType = "coding" and provide:
  1. language: The programming language used (Java, Python, C, C++, SQL, etc.).
  2. approach: Clear step-by-step algorithmic approach.
  3. code: Complete, runnable, clean source code.
  4. importantLines: Array of 3-4 key lines/blocks from the code and what each does.
  5. timeComplexity: Big-O time complexity with brief justification (e.g. "O(n) — single pass").
  6. spaceComplexity: Big-O space complexity with brief justification (e.g. "O(1) — in-place").
  7. interviewTip: Practical edge cases or optimization tips to mention to the interviewer.

Always include 3 relevant followUpQuestions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${recentHistoryText ? `Conversation context:\n${recentHistoryText}\n\n` : ''}User Question: ${prompt}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              responseType: {
                type: Type.STRING,
                description: 'Either "concept" or "coding"',
              },
              title: {
                type: Type.STRING,
                description: 'Concise topic or problem title',
              },
              subject: {
                type: Type.STRING,
                description: 'Subject name',
              },
              definition: {
                type: Type.STRING,
                description: 'For concept questions: clear and concise definition',
              },
              simpleExplanation: {
                type: Type.STRING,
                description: 'For concept questions: beginner-friendly explanation',
              },
              example: {
                type: Type.STRING,
                description: 'For concept questions: real-world example or scenario',
              },
              exampleCodeLanguage: {
                type: Type.STRING,
                description: 'Optional code language for concept example',
              },
              exampleCodeSnippet: {
                type: Type.STRING,
                description: 'Optional short code snippet for concept example',
              },
              interviewAnswer: {
                type: Type.STRING,
                description: 'For concept questions: exact answer to say in an interview',
              },
              language: {
                type: Type.STRING,
                description: 'For coding questions: programming language (e.g. Java, Python, C, C++)',
              },
              approach: {
                type: Type.STRING,
                description: 'For coding questions: step-by-step approach',
              },
              code: {
                type: Type.STRING,
                description: 'For coding questions: complete runnable code without markdown fences',
              },
              importantLines: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    lineRef: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ['lineRef', 'explanation'],
                },
              },
              timeComplexity: {
                type: Type.STRING,
                description: 'For coding questions: Time complexity (e.g. O(n))',
              },
              spaceComplexity: {
                type: Type.STRING,
                description: 'For coding questions: Space complexity (e.g. O(1))',
              },
              interviewTip: {
                type: Type.STRING,
                description: 'For coding questions: practical interview tip and edge cases',
              },
              followUpQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['responseType', 'title', 'subject', 'followUpQuestions'],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(503).json({ fallback: true });
        return;
      }

      const parsed = JSON.parse(rawText.trim());
      if (parsed.responseType === 'coding') {
        res.json({
          structured: {
            type: 'coding',
            title: parsed.title || 'Coding Solution',
            subject: parsed.subject || subject,
            language: parsed.language || preferredLanguage,
            approach: parsed.approach || '',
            code: parsed.code || '',
            importantLines: parsed.importantLines || [],
            timeComplexity: parsed.timeComplexity || 'O(n)',
            spaceComplexity: parsed.spaceComplexity || 'O(1)',
            interviewTip: parsed.interviewTip || '',
            followUpQuestions: parsed.followUpQuestions || [],
          },
        });
      } else {
        res.json({
          structured: {
            type: 'concept',
            title: parsed.title || prompt,
            subject: parsed.subject || subject,
            definition: parsed.definition || '',
            simpleExplanation: parsed.simpleExplanation || '',
            example: parsed.example || '',
            exampleCode:
              parsed.exampleCodeSnippet && parsed.exampleCodeSnippet.trim().length > 0
                ? {
                    language: parsed.exampleCodeLanguage || preferredLanguage.toLowerCase(),
                    code: parsed.exampleCodeSnippet,
                  }
                : undefined,
            interviewAnswer: parsed.interviewAnswer || '',
            followUpQuestions: parsed.followUpQuestions || [],
          },
        });
      }
    } catch (error) {
      console.error('Tutor API error:', error);
      res.status(503).json({ fallback: true, error: 'Fallback to built-in coach knowledge base' });
    }
  });

  // 2. Interview Mode: Generate Single Question
  app.post('/api/coach/interview/question', async (req, res) => {
    try {
      const { subject = 'DSA', difficulty = 'Intermediate', previousQuestions = [] } = req.body;
      const ai = getGenAIClient();
      if (!ai) {
        res.status(503).json({ fallback: true });
        return;
      }

      const avoidList =
        Array.isArray(previousQuestions) && previousQuestions.length > 0
          ? `Do NOT repeat any of these previous questions:\n${previousQuestions.join('\n')}`
          : '';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Generate ONE technical interview question for subject "${subject}" at "${difficulty}" difficulty level. ${avoidList}`,
        config: {
          systemInstruction:
            'You are a senior technical interviewer conducting a 1-on-1 mock interview. Ask exactly one clear, high-signal technical interview question at a time.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              hint: { type: Type.STRING },
              expectedKeyPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              idealAnswer: { type: Type.STRING },
            },
            required: ['question', 'hint', 'expectedKeyPoints', 'idealAnswer'],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(503).json({ fallback: true });
        return;
      }
      res.json(JSON.parse(rawText.trim()));
    } catch (error) {
      console.error('Interview question error:', error);
      res.status(503).json({ fallback: true });
    }
  });

  // 3. Interview Mode: Evaluate User Answer
  app.post('/api/coach/interview/evaluate', async (req, res) => {
    try {
      const { subject, difficulty, question, userAnswer, expectedKeyPoints = [], idealAnswer = '' } = req.body;
      const ai = getGenAIClient();
      if (!ai) {
        res.status(503).json({ fallback: true });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Subject: ${subject} (${difficulty})
Interview Question: ${question}
Expected Key Points: ${Array.isArray(expectedKeyPoints) ? expectedKeyPoints.join(', ') : ''}
Candidate's Answer: ${userAnswer}

Evaluate the candidate's answer constructively and accurately.`,
        config: {
          systemInstruction:
            'You are a supportive yet rigorous technical interviewer. Evaluate the candidate answer fairly, highlighting specific points that were correct, specific concepts or edge cases that were missing, a score out of 10, and a polished improved interview answer.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
                description: 'Score from 1.0 to 10.0',
              },
              verdict: {
                type: Type.STRING,
                description: 'Either "Strong", "Good", or "Needs Improvement"',
              },
              whatWasCorrect: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              whatWasMissing: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              improvedAnswer: {
                type: Type.STRING,
                description: 'Polished, interview-ready model answer',
              },
            },
            required: ['score', 'verdict', 'whatWasCorrect', 'whatWasMissing', 'improvedAnswer'],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(503).json({ fallback: true });
        return;
      }
      const parsed = JSON.parse(rawText.trim());
      res.json({
        score: typeof parsed.score === 'number' ? Math.round(parsed.score * 10) / 10 : 7.5,
        verdict:
          parsed.verdict === 'Strong' || parsed.verdict === 'Good' || parsed.verdict === 'Needs Improvement'
            ? parsed.verdict
            : 'Good',
        whatWasCorrect: parsed.whatWasCorrect || ['Addressed the core question'],
        whatWasMissing: parsed.whatWasMissing || [],
        improvedAnswer: parsed.improvedAnswer || idealAnswer,
      });
    } catch (error) {
      console.error('Interview evaluation error:', error);
      res.status(503).json({ fallback: true });
    }
  });

  // 4. Quiz Mode: Generate Multiple Choice Questions
  app.post('/api/coach/quiz', async (req, res) => {
    try {
      const { subject = 'DSA', difficulty = 'Medium', count = 5 } = req.body;
      const ai = getGenAIClient();
      if (!ai) {
        res.status(503).json({ fallback: true });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Generate ${count} multiple-choice technical interview questions on "${subject}" at "${difficulty}" difficulty.`,
        config: {
          systemInstruction:
            'You are a technical interview quiz creator. Generate accurate, unambiguous multiple-choice questions with 4 options (A, B, C, D), exactly one correct option ("A", "B", "C", or "D"), and a concise technical explanation.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                optionA: { type: Type.STRING },
                optionB: { type: Type.STRING },
                optionC: { type: Type.STRING },
                optionD: { type: Type.STRING },
                correctOption: {
                  type: Type.STRING,
                  description: 'Must be "A", "B", "C", or "D"',
                },
                explanation: { type: Type.STRING },
              },
              required: ['question', 'optionA', 'optionB', 'optionC', 'optionD', 'correctOption', 'explanation'],
            },
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(503).json({ fallback: true });
        return;
      }
      const items = JSON.parse(rawText.trim());
      if (!Array.isArray(items) || items.length === 0) {
        res.status(503).json({ fallback: true });
        return;
      }

      const questions = items.map((item, idx) => ({
        id: `ai-quiz-${Date.now()}-${idx}`,
        subject,
        difficulty,
        question: item.question,
        options: {
          A: item.optionA,
          B: item.optionB,
          C: item.optionC,
          D: item.optionD,
        },
        correctOption: ['A', 'B', 'C', 'D'].includes(item.correctOption) ? item.correctOption : 'A',
        explanation: item.explanation,
      }));

      res.json({ questions });
    } catch (error) {
      console.error('Quiz API error:', error);
      res.status(503).json({ fallback: true });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tech Interview Coach server running on http://localhost:${PORT}`);
  });
}

startServer();
