export interface Project {
  id: string;
  name: string;
  description?: string;
  infraType: string;
  location: string;
  region: string;
  createdAt: string;
  selectedNorms: string[];
  quizAnswers: { questionKey: string; answerValue: string }[];
}

export interface NormCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ChatMessage {
  id?: string;
  sender: 'user' | 'bot' | 'system';
  message: string;
  timestamp: string;
}