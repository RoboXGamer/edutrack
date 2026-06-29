export type LessonType = "lesson" | "practice";

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Lesson = {
  id: number;
  unitId: number;
  title: string;
  duration: string;
  type: LessonType;
  mcqs: number;
  content: string;
  questions?: Question[];
};

export type Unit = {
  id: number;
  name: string;
  icon: string;
  lessons: Lesson[];
};

export type Subject = {
  id: string;
  name: string;
  courseData: {
    units: Unit[];
  };
};

export type QuizScore = {
  score: number;
  correct: number;
  total: number;
  attempts: number;
  bestScore: number;
  lastAttempt: string;
};

export type ProgressRecord = {
  readLessons: number[];
  quizScores: Record<string, QuizScore>;
  lastAccessed: string | null;
};

export type AppProgress = Record<string, ProgressRecord>;

export type DailyStats = {
  date: string;
  done: number;
};
