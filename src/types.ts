export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  createdAt: Date;
  userId: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Enhanced Basic 4 Educational Content Types based on GES Curriculum
export interface Basic4Subject {
  id: string;
  name: string;
  color: string;
  description: string;
  curriculumStrand?: string;
  totalLessons: number;
  completedLessons: number;
  topics?: Topic[];
  learningOutcomes?: string[];
  assessmentCriteria?: AssessmentCriterion[];
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  lessonNumber: number;
  duration: string; // e.g., "45 minutes"
  prerequisiteKnowledge: string[];
  lessons: Lesson[];
  learningIndicators?: LearningIndicator[];
  coreCompetencies?: string[];
  values?: string[];
  crossCuttingIssues?: string[];
}

export interface Lesson {
  id: string;
  topicId: string;
  lessonNumber: number;
  title: string;
  learningObjectives: string[];
  content: string;
  keyVocabulary: VocabularyTerm[];
  examples: Example[];
  illustrations: string[]; // image URLs
  duration: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  isCompleted: boolean;
  completedAt?: Date;
  learningActivities?: LearningActivity[];
  assessmentTasks?: AssessmentTask[];
  resources?: Resource[];
}

export interface LearningIndicator {
  id: string;
  code: string; // e.g., "B4.1.1.1"
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  assessmentMethod: string;
}

export interface LearningActivity {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group' | 'whole-class';
  duration: string;
  materials: string[];
  instructions: string[];
}

export interface AssessmentTask {
  id: string;
  title: string;
  description: string;
  type: 'formative' | 'summative';
  criteria: string[];
  rubric: Rubric[];
}

export interface Rubric {
  level: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement';
  description: string;
  score: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'textbook' | 'worksheet' | 'digital' | 'physical' | 'multimedia';
  url?: string;
  description: string;
}

export interface AssessmentCriterion {
  id: string;
  criterion: string;
  weight: number;
  description: string;
}

export interface VocabularyTerm {
  term: string;
  definition: string;
  pronunciation?: string; // audio file URL
  example: string;
  partOfSpeech?: string;
  relatedTerms?: string[];
}

export interface Example {
  description: string;
  explanation: string;
  imageUrl?: string;
  context?: string;
  difficulty?: 'easy' | 'medium' | 'challenging';
}

export interface Basic4Quiz {
  id: string;
  lessonId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  timeLimit?: number; // in minutes
  questions: Basic4Question[];
  createdAt: Date;
  userId: string;
  learningIndicators?: string[];
  assessmentCriteria?: string[];
}

export interface Basic4Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'true-false' | 'short-answer' | 'essay' | 'practical';
  text: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  points: number;
  imageUrl?: string;
  audioUrl?: string;
  learningIndicator?: string;
  difficulty?: 'easy' | 'medium' | 'challenging';
}

export interface Basic4QuizResult {
  id: string;
  quizId: string;
  userId: string;
  lessonId: string;
  score: number;
  totalPoints: number;
  earnedPoints: number;
  timeTaken: number; // in seconds
  completedAt: Date;
  feedback: string;
  learningIndicatorScores: LearningIndicatorScore[];
}

export interface LearningIndicatorScore {
  indicatorCode: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  class: string;
  grade: string;
  parentEmail?: string;
  teacherEmail?: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'colorful';
    audioEnabled: boolean;
    notificationsEnabled: boolean;
  };
}

export interface ProgressData {
  id: string;
  userId: string;
  lessonId: string;
  topicId: string;
  subjectId: string;
  isCompleted: boolean;
  completedAt?: Date;
  timeSpent: number; // in seconds
  quizScores: number[];
  averageScore: number;
  attempts: number;
  learningIndicatorProgress: LearningIndicatorProgress[];
}

export interface LearningIndicatorProgress {
  indicatorCode: string;
  isAchieved: boolean;
  attempts: number;
  bestScore: number;
  lastAttempt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  type: 'lesson' | 'quiz' | 'streak' | 'subject' | 'learning-indicator';
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  points: number;
  learningIndicator?: string;
}

export interface GamificationData {
  userId: string;
  totalPoints: number;
  level: number;
  badges: Achievement[];
  streak: number; // consecutive days of learning
  lastActivityDate: Date;
  subjectProgress: SubjectProgress[];
}

export interface SubjectProgress {
  subjectId: string;
  completedTopics: number;
  totalTopics: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  learningIndicatorsAchieved: number;
  totalLearningIndicators: number;
}
