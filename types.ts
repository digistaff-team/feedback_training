export interface QuizQuestion {
  id: number;
  statement: string;
  type: 'Observation' | 'Inference';
  explanation: string;
}

export interface AchieveFactor {
  key: string;
  name: string;
  question: string;
  solution: string;
}

export interface GrowStep {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

export interface FeedbackPlan {
  employeeName: string;
  problemStatement: string;
  observations: string[];
  achieveAnalysis: Record<string, boolean>; // key -> isSelected
  growGoal: string;
  growReality: string;
  growOptions: string;
  growWill: string;
}

export enum AppRoute {
  HOME = 'home',
  EVALUATE = 'evaluate',
  ANALYZE = 'analyze',
  PLANNING = 'planning',
  DISCUSSION = 'discussion',
  SUMMARY = 'summary',
  THEORY = 'theory'
}