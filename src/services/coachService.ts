import {
  SubjectId,
  StructuredCoachResponse,
  InterviewDifficulty,
  InterviewTurn,
  InterviewEvaluation,
  QuizDifficulty,
  QuizQuestion,
  CoachPreferences,
} from '../types';
import {
  generateFallbackTutorResponse,
  INTERVIEW_QUESTION_BANK,
  evaluateInterviewAnswerFallback,
  getQuizQuestionsForSubject,
} from '../data/knowledgeBase';

export async function askTutorQuestion(
  prompt: string,
  subject: SubjectId,
  preferences: CoachPreferences,
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<StructuredCoachResponse> {
  try {
    const response = await fetch('/api/coach/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        subject,
        preferredLanguage: preferences.preferredLanguage,
        explanationDepth: preferences.explanationDepth,
        history,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.structured) {
        return data.structured as StructuredCoachResponse;
      }
    }
  } catch {
    // Graceful fallback to built-in technical knowledge base
  }

  // Simulate brief thinking delay if fallback is instantaneous
  await new Promise((r) => setTimeout(r, 420));
  return generateFallbackTutorResponse(prompt, subject, preferences.preferredLanguage);
}

export async function fetchInterviewQuestion(
  subject: SubjectId,
  difficulty: InterviewDifficulty,
  questionNumber: number,
  previousQuestions: string[]
): Promise<InterviewTurn> {
  try {
    const response = await fetch('/api/coach/interview/question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject,
        difficulty,
        previousQuestions,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.question) {
        return {
          id: `int-${Date.now()}-${questionNumber}`,
          questionNumber,
          subject,
          difficulty,
          question: data.question,
          hint: data.hint || 'Break your explanation into definition, internal mechanism, and trade-offs.',
          expectedKeyPoints: Array.isArray(data.expectedKeyPoints) ? data.expectedKeyPoints : [],
          idealAnswer: data.idealAnswer || '',
        };
      }
    }
  } catch {
    // Graceful fallback to curated interview bank
  }

  await new Promise((r) => setTimeout(r, 350));

  const subjectCandidates = INTERVIEW_QUESTION_BANK.filter(
    (q) => q.subject === subject && !previousQuestions.includes(q.question)
  );
  const diffCandidates = subjectCandidates.filter((q) => q.difficulty === difficulty);
  const pool =
    diffCandidates.length > 0
      ? diffCandidates
      : subjectCandidates.length > 0
      ? subjectCandidates
      : INTERVIEW_QUESTION_BANK.filter((q) => !previousQuestions.includes(q.question));

  const chosen = pool[questionNumber % Math.max(1, pool.length)] || INTERVIEW_QUESTION_BANK[0];

  return {
    id: `int-${Date.now()}-${questionNumber}`,
    questionNumber,
    subject,
    difficulty,
    question: chosen.question,
    hint: chosen.hint,
    expectedKeyPoints: chosen.expectedKeyPoints,
    idealAnswer: chosen.idealAnswer,
  };
}

export async function evaluateCandidateAnswer(
  turn: InterviewTurn,
  userAnswer: string
): Promise<InterviewEvaluation> {
  try {
    const response = await fetch('/api/coach/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: turn.subject,
        difficulty: turn.difficulty,
        question: turn.question,
        userAnswer,
        expectedKeyPoints: turn.expectedKeyPoints,
        idealAnswer: turn.idealAnswer,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.score === 'number') {
        return data as InterviewEvaluation;
      }
    }
  } catch {
    // Graceful fallback
  }

  await new Promise((r) => setTimeout(r, 450));
  return evaluateInterviewAnswerFallback(turn, userAnswer);
}

export async function fetchQuizSet(
  subject: SubjectId,
  difficulty: QuizDifficulty,
  count: number = 5
): Promise<QuizQuestion[]> {
  try {
    const response = await fetch('/api/coach/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject,
        difficulty,
        count,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.questions) && data.questions.length > 0) {
        return data.questions as QuizQuestion[];
      }
    }
  } catch {
    // Graceful fallback
  }

  await new Promise((r) => setTimeout(r, 380));
  return getQuizQuestionsForSubject(subject, difficulty, count);
}
