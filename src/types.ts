export type AppMode = 'tutor' | 'interview' | 'quiz';

export type SubjectId =
  | 'DSA'
  | 'Java'
  | 'Python'
  | 'C/C++'
  | 'DBMS'
  | 'SQL'
  | 'Computer Networks'
  | 'Operating Systems'
  | 'OOP'
  | 'Web Development'
  | 'AI/ML'
  | 'Cloud'
  | 'Software Engineering';

export type SubjectCategory = 'Languages' | 'Core CS' | 'Modern Tech';

export interface SubjectMeta {
  id: SubjectId;
  label: string;
  shortLabel: string;
  category: SubjectCategory;
  description: string;
  sampleQuestions: string[];
  codingQuestions: string[];
}

export interface ConceptStructuredResponse {
  type: 'concept';
  title: string;
  subject: string;
  definition: string;
  simpleExplanation: string;
  example: string;
  exampleCode?: {
    language: string;
    code: string;
  };
  interviewAnswer: string;
  followUpQuestions: string[];
}

export interface CodingStructuredResponse {
  type: 'coding';
  title: string;
  subject: string;
  language: string;
  approach: string;
  code: string;
  importantLines: {
    lineRef: string;
    explanation: string;
  }[];
  timeComplexity: string;
  spaceComplexity: string;
  interviewTip: string;
  followUpQuestions: string[];
}

export type StructuredCoachResponse = ConceptStructuredResponse | CodingStructuredResponse;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  subject?: SubjectId;
  structured?: StructuredCoachResponse;
}

export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewEvaluation {
  score: number; // 1 to 10
  verdict: 'Strong' | 'Good' | 'Needs Improvement';
  whatWasCorrect: string[];
  whatWasMissing: string[];
  improvedAnswer: string;
}

export interface InterviewTurn {
  id: string;
  questionNumber: number;
  subject: SubjectId;
  difficulty: InterviewDifficulty;
  question: string;
  hint: string;
  expectedKeyPoints: string[];
  idealAnswer: string;
  userAnswer?: string;
  evaluation?: InterviewEvaluation;
}

export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  id: string;
  subject: SubjectId;
  difficulty: QuizDifficulty;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface UserStats {
  tutorQuestionsAsked: number;
  codingSolutionsGenerated: number;
  interviewQuestionsEvaluated: number;
  totalInterviewScore: number;
  quizzesCompleted: number;
  quizQuestionsAnswered: number;
  quizCorrectAnswers: number;
  subjectActivity: Record<
    SubjectId,
    {
      questions: number;
      quizCorrect: number;
      quizTotal: number;
      interviewCount: number;
    }
  >;
  recentSessions: {
    id: string;
    mode: 'Tutor Q&A' | 'Interview Mode' | 'Quiz Mode';
    subject: SubjectId;
    summary: string;
    date: string;
    scoreText?: string;
  }[];
}

export interface CoachPreferences {
  preferredLanguage: 'Java' | 'Python' | 'C++' | 'C';
  explanationDepth: 'Concise' | 'Balanced' | 'Deep Dive';
  includeComplexityAlways: boolean;
  autoScrollChat: boolean;
}
