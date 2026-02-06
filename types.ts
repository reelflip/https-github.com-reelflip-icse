
export type Grade = 1 | 2 | 3 | 4 | 5;
export type Subject = 'English' | 'Mathematics' | 'EVS' | 'Science' | 'Creative';

export interface ActivityContent {
  title: string;
  description: string;
  question: string;
  options?: string[];
  answer: string;
  funFact: string;
}

export interface StoryNode {
  text: string;
  illustrationPrompt: string;
  options: {
    text: string;
    nextPrompt: string;
  }[];
  isEnd: boolean;
}

export interface ScienceExperiment {
  title: string;
  materials: string[];
  steps: string[];
  explanation: string;
  videoPrompt: string;
}

export interface UserStats {
  points: number;
  badges: string[];
  level: number;
}
